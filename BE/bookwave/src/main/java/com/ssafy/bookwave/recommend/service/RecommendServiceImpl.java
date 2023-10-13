package com.ssafy.bookwave.recommend.service;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.domain.GenreDetailDict;
import com.ssafy.bookwave.book.domain.GenreDict;
import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.book.dto.response.BookshelfListResponseDto;
import com.ssafy.bookwave.book.dto.response.GenreDictResponseDto;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.book.repository.GenreDictRepository;
import com.ssafy.bookwave.book.service.BookshelfService;
import com.ssafy.bookwave.diary.domain.Diary;
import com.ssafy.bookwave.diary.repository.DiaryRepository;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.FavoriteGenreResponseDto;
import com.ssafy.bookwave.member.repository.GenreDetailRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.member.service.GenreService;
import com.ssafy.bookwave.recommend.dto.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RecommendServiceImpl implements RecommendService{
    private final GenreDetailRepository genreDetailRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final GenreService genreService;
    private final BookshelfService bookshelfService;
    private final GenreDictRepository genreDictRepository;
    private final DiaryRepository diaryRepository;
    private final RedisTemplate<String, List<RecommendBookResponseDto>> recommendBookRedisTemplate;
    private final RedisTemplate<String, Map<String,Object>> todayBookRedisTemplate;
    private final Object cacheLock = new Object();
    private final String[] emotionList = {"행복","자신감","평화","후회","피로","걱정","분노","슬픔"};


    @Override
    public GenreRecommendResponse getGenreRecommendList(Member findMember) {
        FavoriteGenreResponseDto favoriteGenreResponseDto = genreService.getFavoriteGenreList(findMember);
        Map<String, List<RecommendBookResponseDto>> favoriteBookList = getFavoriteBookList(favoriteGenreResponseDto);
        List<String> favoriteGenreList = favoriteBookList.keySet().stream().collect(Collectors.toList());
        return GenreRecommendResponse.builder()
                .favoriteGenreList(favoriteGenreList)
                .GenreBookList(favoriteBookList)
                .build();
    }
    @Override
    public Map<String, List<RecommendBookResponseDto>> getFavoriteBookList(FavoriteGenreResponseDto favoriteGenreListDto) {
        List<Integer> favoriteGenresId = extractFavoriteGenresId(favoriteGenreListDto.getGenreDictResponseDtoList());
        Map<String,List<RecommendBookResponseDto>> bookList = new HashMap<>();
        for(Integer id:favoriteGenresId){
            List<GenreDetailDict> genreDetailDicts = genreDetailRepository.findByGenreDictId(id);
            Optional<GenreDict> findGenreDict = genreDictRepository.findById(id);
            String genreName = findGenreDict.get().getName();
            for(GenreDetailDict genreDetailDict:genreDetailDicts){
                List<Book> books = getRandomBooksByGenreDetailDict(genreDetailDict.getId());
                List<RecommendBookResponseDto> recommendBooks = books.stream()
                        .map(book -> RecommendBookResponseDto.builder()
                                .bookId(book.getId())
                                .bookImageUrl(book.getImageUrl())
                                .bookTitle(book.getTitle())
                                .author(book.getAuthor())
                                .build())
                        .collect(Collectors.toList());

                bookList.computeIfAbsent(genreName, k -> new ArrayList<>()).addAll(recommendBooks);
            }
        }
        bookList.forEach((genre, books) -> {
            if (books.size() > 15) {
                bookList.put(genre, books.subList(0, 15));
            }
        });
        return bookList;
    }

    public List<Book> getRandomBooksByGenreDetailDict(Integer genreDetailDict) {
        int count = bookRepository.countByGenreDetailDict(genreDetailDict);
        int randomOffset = (count < 5) ? 0 : new Random().nextInt(count - 4);
        return bookRepository.findRandomBooksByGenreDetailDict(genreDetailDict,10);
    }

    public List<Integer> extractFavoriteGenresId(List<GenreDictResponseDto> genreDictResponseDtoList) {
        return genreDictResponseDtoList.stream()
                .map(GenreDictResponseDto::getId)
                .collect(Collectors.toList());
    }

    @Override
    public RecentRecommendResponse getRecentRecommendList(Member findMember) {
        BookshelfListResponseDto bookshelfList = bookshelfService.getBookshelfList(findMember.getId());
        if(bookshelfList==null || bookshelfList.isRecentListEmpty()){
            return RecentRecommendResponse.builder().build();
        }
        BookBookshelfResponseDto randomBook = getRandomBookFromShelf(bookshelfList);
        List<RecommendBookResponseDto> recentRecommendBooks = getRecentRecommendations(randomBook);
        return RecentRecommendResponse.builder()
                .recentBookTitle(randomBook.getBookTitle())
                .recentList(recentRecommendBooks)
                .build();
    }

    @Override
    public BbtiRecommendResponse getBbtiRecommendList(Member findMember) {
        int bbtiType = findMember.getBbtiType().getId();
        List<RecommendBookResponseDto> bbtiRecommendList  = new ArrayList<>();
        String bbtiName="";
        if(bbtiType!=1){
            bbtiName = findMember.getBbtiType().getName();
            Set<Integer> uniqueBookIdList = getUniqueBookIdsByBbtiType(bbtiType);
            for(Integer nowId : uniqueBookIdList){
                Optional<Book> book = bookRepository.findById(nowId);
                RecommendBookResponseDto responseDto = RecommendBookResponseDto
                        .builder()
                        .bookId(book.get().getId())
                        .bookTitle(book.get().getTitle())
                        .bookImageUrl(book.get().getImageUrl())
                        .author(book.get().getAuthor())
                        .build();
                bbtiRecommendList.add(responseDto);
            }
        }
        return BbtiRecommendResponse.builder()
                .bbti(bbtiName)
                .bookList(bbtiRecommendList)
                .build();
    }

    @Override
    public MoodRecommendResponse getMoodRecommendList(Member findMember) {
        List<MoodRecommendResponseDto> moodList = new ArrayList<>();
        for(int idx=0;idx<emotionList.length;idx++){
            String emotion = emotionList[idx];
            List<RecommendBookResponseDto> BookByEmotion = getBooksFromRedis(emotion);
            MoodRecommendResponseDto emotionList = MoodRecommendResponseDto.builder()
                    .moodId(idx)
                    .moodType(emotion)
                    .bookList(BookByEmotion)
                    .build();
            moodList.add(emotionList);
        }
        System.out.println(moodList);
        return MoodRecommendResponse.builder().moodList(moodList).build();
    }

    @Override
    public TodayRecommendResponse getTodayRecommendBook(Member findMember) {
        //Member 로 일기 list 찾기
        Optional<Diary> todayDiary = getTodayDiary(diaryRepository.findByMemberOrderByLastModifiedDateDesc(findMember));

        if(!todayDiary.isPresent()){
            return TodayRecommendResponse.builder().build();
        }

        String socialId = findMember.getSocialId();
        Map<String, Object> redisData = todayBookRedisTemplate.opsForValue().get(socialId);
        String todayEmotion = (String) redisData.get("emotion");
        Integer bookID = (Integer) redisData.get("bookId");

        //bookId로 book 찾아
        Optional<Book> todayBook = bookRepository.findById(bookID);

        return TodayRecommendResponse.builder()
                .todayEmotion(todayEmotion)
                .bookId(todayBook.get().getId())
                .bookTitle(todayBook.get().getTitle())
                .bookAuthor(todayBook.get().getAuthor())
                .bookImgUrl(todayBook.get().getImageUrl())
                .build();
    }

    private Optional<Diary> getTodayDiary(List<Diary> diaries) {

        if(diaries.isEmpty()){
            return Optional.empty();
        }

        Diary recentDiary = diaries.get(0);
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = LocalDate.now().plusDays(1).atStartOfDay();

        if (recentDiary.getLastModifiedDate().isAfter(startOfDay) && recentDiary.getLastModifiedDate().isBefore(endOfDay)) {
            return Optional.of(recentDiary);
        }
        return Optional.empty();
    }

    private Set<Integer> getUniqueBookIdsByBbtiType(int bbtiType) {
        List<Member> sameBbtis = memberRepository.findByBbtiTypeId(bbtiType);
        Set<Integer> uniqueBookIdList = new HashSet<Integer>();
        for(Member sameMember : sameBbtis){
            BookshelfListResponseDto bookshelfList = bookshelfService.getBookshelfList(sameMember.getId());
            addBookIdsToResultList(uniqueBookIdList,bookshelfList.getDoneBookList());
            addBookIdsToResultList(uniqueBookIdList,bookshelfList.getReadingBookList());
        }
        return uniqueBookIdList;
    }

    private void addBookIdsToResultList(Set<Integer> uniqueBookIdList, List<BookBookshelfResponseDto> bookList) {
        for(BookBookshelfResponseDto book : bookList ){
            uniqueBookIdList.add(book.getBookId());
        }
    }

    public BookBookshelfResponseDto getRandomBookFromShelf(BookshelfListResponseDto bookshelfList){
        List<BookBookshelfResponseDto> combinedBooks = new ArrayList<>();
        combinedBooks.addAll(bookshelfList.getDoneBookList());
        combinedBooks.addAll(bookshelfList.getReadingBookList());
        return combinedBooks.get(new Random().nextInt(combinedBooks.size()));
    }

    public List<RecommendBookResponseDto> getRecentRecommendations(BookBookshelfResponseDto book){
        Optional<Book> findBook = bookRepository.findById(book.getBookId());
        if(!findBook.isPresent()){
            return Collections.emptyList();
        }
        Integer genreDetailId = findBook.get().getGenreDetailDict().getId();
        return bookRepository.findRandomBooksByGenreDetailDict(genreDetailId,50).stream()
                .filter(b-> !b.getId().equals(book.getBookId()))
                .map(b->RecommendBookResponseDto.builder()
                        .bookId(b.getId())
                        .bookImageUrl(b.getImageUrl())
                        .bookTitle(b.getTitle())
                        .author(b.getAuthor())
                        .build())
                .collect(Collectors.toList());
    }

    //1시간마다 redis에 랜덤 book list update
    @Scheduled(fixedDelay =36000)
    protected void updateBooksCache(){
        synchronized (cacheLock){
            for(String emotion:emotionList){
                List<Book> randomBooks = bookRepository.findRandomBooksByEmotionContaining(emotion);
                List<RecommendBookResponseDto> randomBookDtos = randomBooks.stream()
                        .map(this::convertToDto)
                        .collect(Collectors.toList());
                saveToRedis(emotion,randomBookDtos);

            }
        }
    }
    private void saveToRedis(String emotion, List<RecommendBookResponseDto> randomBooks) {
        //1시간 후 데이터 만료
        recommendBookRedisTemplate.opsForValue().set(emotion,randomBooks,1, TimeUnit.HOURS);
    }
    private RecommendBookResponseDto convertToDto(Book book) {
        RecommendBookResponseDto bookDto = RecommendBookResponseDto.builder()
                .bookId(book.getId())
                .bookTitle(book.getTitle())
                .bookImageUrl(book.getImageUrl())
                .author(book.getAuthor())
                .build();
        return bookDto;
    }
    private List<RecommendBookResponseDto> getBooksFromRedis(String emotion){
        List<RecommendBookResponseDto> bookDtos =recommendBookRedisTemplate.opsForValue().get(emotion);

        System.out.println(emotion);
        if(bookDtos==null){
            System.out.println("없어!!");
            List<Book> randomBooksByEmotion = bookRepository.findRandomBooksByEmotionContaining(emotion);
            System.out.println(randomBooksByEmotion.size());
            bookDtos = randomBooksByEmotion.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            saveToRedis(emotion,bookDtos);
        }
        else{
            int size = bookDtos.size();

            // bookDtos에서 최소 5개, 최대 15개 데이터만 추출
            if (size > 15) {
                bookDtos = bookDtos.subList(0, 15);
            } else if (size < 5) {
                bookDtos = bookDtos.subList(0, size); // 모든 데이터 반환
            }
        }

        return bookDtos;
    }


}
