package com.ssafy.bookwave.book.service;

import com.ssafy.bookwave.bbti.domain.BbtiType;
import com.ssafy.bookwave.bbti.repository.BbtiRepository;
import com.ssafy.bookwave.bbti.repository.BbtiTypeElementRepository;
import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.domain.BookEmotion;
import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.domain.GenreDetailDict;
import com.ssafy.bookwave.book.domain.GenreDetailDict.GenreDictIdInfoMapping;
import com.ssafy.bookwave.book.domain.GenreDict;
import com.ssafy.bookwave.book.dto.response.*;
import com.ssafy.bookwave.book.enums.State;
import com.ssafy.bookwave.book.repository.BookEmotionRepository;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.book.repository.BookshelfRepository;
import com.ssafy.bookwave.book.repository.GenreDetailDictRepository;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.domain.MemberBookScore;
import com.ssafy.bookwave.member.repository.MemberBookScoreRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.record.dto.response.RecordPreviewResponseDto;
import com.ssafy.bookwave.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final BookshelfRepository bookshelfRepository;
    private final MemberBookScoreRepository memberBookScoreRepository;
    private final RecordRepository recordRepository;
    private final BookEmotionRepository bookEmotionRepository;
    private final MemberRepository memberRepository;
    private final GenreDetailDictRepository genreDetailDictRepository;
    private final BbtiRepository bbtiRepository;

    @Override
    public BookDetailResponseDto getBookDetail(int bookId, Member findMember) {

        // 로그인된 회원 정보
        int memberId = findMember.getId();
        log.info("멤버 아이디: " + memberId);

        // 도서 테이블 정보
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isEmpty()) return null;

        // 멤버 책장 테이블에서 책의 상태값 조회
        Optional<BookshelfBook> bookShelfBook = Optional.ofNullable(bookshelfRepository.findByBookIdAndMemberId(bookId, memberId));
        int bookState = -1;
        if (bookShelfBook.isPresent()) {
             bookState = bookShelfBook.get().getState().getValue();
        }
        // 평점 조회
        Optional<Double> bookScore = Optional.of(Optional.ofNullable(memberBookScoreRepository.getAverageScoreByMemberId(bookId))
                                            .orElse(0.0));

        // BBTI별 가져오기
        List<BookByBbtiChartResponseDto> bookByBbtiChartResponseDtos = new ArrayList<>();
        List<BbtiType> bbtiTypes = bbtiRepository.findAll();
            // 첫번째 제외
        bbtiTypes.remove(0);
        for(BbtiType type : bbtiTypes) {
            int bbtiCnt = bookRepository.CountByBbtiType(bookId, type.getId());
            log.info("bbti 타입:::::" + type.getId() + type.getName());
            log.info("bbti 타입별 책장 카운트:::::::" + bbtiCnt);
            BookByBbtiChartResponseDto bookByBbtiChart = BookByBbtiChartResponseDto.builder()
                    .bbtiTypeId(type.getId())
                    .bbtiType(type.getName())
                    .bbtiCnt(bbtiCnt)
                    .build();
            bookByBbtiChartResponseDtos.add(bookByBbtiChart);
        }

        // 감정별 가져오기
        List<BookEmotionResponseDto> bookEmotionResponseDtoList = new ArrayList<>();
        Optional<BookEmotion> bookEmotion = bookEmotionRepository.findById(bookId);
        if(bookEmotion.isPresent()) {
            BookEmotionResponseDto sad = BookEmotionResponseDto.builder()
                    .emotionType("슬픔")
                    .emotionPercent(bookEmotion.get().getSad())
                    .build();
            bookEmotionResponseDtoList.add(sad);

            BookEmotionResponseDto angry = BookEmotionResponseDto.builder()
                    .emotionType("분노")
                    .emotionPercent(bookEmotion.get().getAngry())
                    .build();
            bookEmotionResponseDtoList.add(angry);

            BookEmotionResponseDto scare = BookEmotionResponseDto.builder()
                    .emotionType("걱정")
                    .emotionPercent(bookEmotion.get().getScare())
                    .build();
            bookEmotionResponseDtoList.add(scare);

            BookEmotionResponseDto tired = BookEmotionResponseDto.builder()
                    .emotionType("피로")
                    .emotionPercent(bookEmotion.get().getTired())
                    .build();
            bookEmotionResponseDtoList.add(tired);

            BookEmotionResponseDto regret = BookEmotionResponseDto.builder()
                    .emotionType("후회")
                    .emotionPercent(bookEmotion.get().getRegret())
                    .build();
            bookEmotionResponseDtoList.add(regret);

            BookEmotionResponseDto happy = BookEmotionResponseDto.builder()
                    .emotionType("행복")
                    .emotionPercent(bookEmotion.get().getHappy())
                    .build();
            bookEmotionResponseDtoList.add(happy);

            BookEmotionResponseDto confidence = BookEmotionResponseDto.builder()
                    .emotionType("자신감")
                    .emotionPercent(bookEmotion.get().getConfidence())
                    .build();
            bookEmotionResponseDtoList.add(confidence);

            BookEmotionResponseDto peace = BookEmotionResponseDto.builder()
                    .emotionType("평화")
                    .emotionPercent(bookEmotion.get().getPeace())
                    .build();
            bookEmotionResponseDtoList.add(peace);
        }

        for(BookEmotionResponseDto dto : bookEmotionResponseDtoList) {
            log.info(dto.getEmotionType() + String.valueOf(dto.getEmotionPercent()));
        }

        // 독서 기록 가져오기
        List<Record> byBookId = recordRepository.findByBookId(bookId);
        List<RecordPreviewResponseDto> recordPreviewResposeDtos = byBookId.stream()
                .map(record -> RecordPreviewResponseDto.builder()
                        .recordId(record.getId())
                        .recordTitle(record.getName())
                        .recordContent(record.getContent())
                        .recordMemberNickname(record.getMember().getNickname())
                        .recordMemberProfileImageUrl(record.getMember().getProfileImgPath())
                        .build())
                .collect(Collectors.toList());

        // 책장에 담긴 수 가져오기
        int bookshelfCnt = bookshelfRepository.countByBookIdAndStateIn(bookId, List.of(State.WISH, State.READING, State.DONE));

        return BookDetailResponseDto.builder()
                .id(book.get().getId())
                .isbn(book.get().getIsbn())
                .imageUrl(book.get().getImageUrl())
                .title(book.get().getTitle())
                .author(book.get().getAuthor())
                .publishDate(book.get().getPublishDate())
                .genre(book.get().getGenreDetailDict().getName())
                .publisher(book.get().getPublisher())
                .content(book.get().getContent())
                .state(bookState)
                .bookScore(bookScore.get())
                .recordListCnt(recordPreviewResposeDtos.size())
                .recordPreviewDtoList(recordPreviewResposeDtos)
                .emotionChartList(bookEmotionResponseDtoList)
                .bookshelfCnt(bookshelfCnt)
                .bbtiChartList(bookByBbtiChartResponseDtos)
                .build();
    }

    @Override
    @Transactional
    public void changeBookState(Integer memberId, int bookId, int bookState) {

        Optional<BookshelfBook> bookshelfBook = Optional.ofNullable(bookshelfRepository.findByBookIdAndMemberId(bookId, memberId));

        State state = null;
        if(bookState == 0) state = State.WISH;
        if(bookState == 1) state = State.READING;
        if(bookState == 2) state = State.DONE;
        if(bookState == 3) state = State.DELETE;

        if(bookshelfBook.isPresent()) {
            bookshelfBook.get().updateState(state);
        } else {
            //데이터 자체를 삽입
            Optional<Book> book = bookRepository.findById(bookId);
            Optional<Member> member = memberRepository.findById(memberId);

            BookshelfBook newBookShelfBook = BookshelfBook.builder()
                    .book(book.get())
                    .member(member.get())
                    .state(state)
                    .build();

            bookshelfRepository.save(newBookShelfBook);
        }

    }

    @Override
    public List<BookListBySearchResponseDto> searchBookByKeyword(String keyword) {
        //작가 또는 제목에 해당 키워드가 있으면 리스트를 뽑는다.
        List<Book> books = bookRepository.findByAuthorContainsOrTitleContains(keyword, keyword);

        List<CompletableFuture<BookListBySearchResponseDto>> futures = books.stream()
                .map(searchedBook -> CompletableFuture.supplyAsync(() -> {
                    int bookshelfCnt = bookshelfRepository.countByBookIdAndStateIn(searchedBook.getId(), List.of(State.WISH, State.READING, State.DONE));
                    log.info("현재 도서 상세 장르 객체 !!!!! : " + ((searchedBook.getGenreDetailDict() != null) ? searchedBook.getGenreDetailDict() : null) );
                    log.info("현재 도서 대분류장르 객체 !!!!! : " + ((searchedBook.getGenreDetailDict() != null) ? searchedBook.getGenreDetailDict().getGenreDict() : "값 없음"));

                    return BookListBySearchResponseDto.builder()
                            .bookId(searchedBook.getId())
                            .bookImageUrl(searchedBook.getImageUrl())
                            .bookTitle(searchedBook.getTitle())
                            .author(searchedBook.getAuthor())
                            .publishDate(searchedBook.getPublishDate())
                            .score(searchedBook.getScore())
                            .bookShelfCnt(bookshelfCnt)  // bookShelfCnt를 계산한 결과를 설정
                            .genre(searchedBook.getGenreDetailDict().getGenreDict().getId())
                            .build();
                }))
                .collect(Collectors.toList());

        List<BookListBySearchResponseDto> bookList = futures.stream()
                .map(CompletableFuture::join)  // CompletableFuture의 결과를 가져옴
                .collect(Collectors.toList());

        log.info("검색된 도서 개수:::::::::::::::::: " + bookList.size());

        return bookList;
    }

    @Override
    public List<BookListBySearchResponseDto> searchBookByGenre(int genreId) {

        //genreDetailDict의 genreDictId가 genreId와 일치하는 book을 가져온다
        //  1. genreDetailDict에서 genreDictId가 genreId 와 일치하는 id 리스트를 가져온다
        List<GenreDictIdInfoMapping> genreDetailList = genreDetailDictRepository.findByGenreDictId(genreId);
        List<Integer> genreDictId = new ArrayList<>();
        for (GenreDictIdInfoMapping info : genreDetailList) {
            genreDictId.add(info.getId());
        }
        //  2. book에서 genreDetailDictId에 1번 리스트애들이 포함되어있는 book을 가져온다
        List<Book> books = bookRepository.findByGenreDetailDictIdIn(genreDictId);

        List<CompletableFuture<BookListBySearchResponseDto>> futures = books.stream()
                .map(searchedBook -> CompletableFuture.supplyAsync(() -> {
                    int bookshelfCnt = bookshelfRepository.countByBookIdAndStateIn(searchedBook.getId(), List.of(State.WISH, State.READING, State.DONE));

                    return BookListBySearchResponseDto.builder()
                            .bookId(searchedBook.getId())
                            .bookImageUrl(searchedBook.getImageUrl())
                            .bookTitle(searchedBook.getTitle())
                            .author(searchedBook.getAuthor())
                            .publishDate(searchedBook.getPublishDate())
                            .score(searchedBook.getScore())
                            .bookShelfCnt(bookshelfCnt)  // bookShelfCnt를 계산한 결과를 설정
                            .genre(genreId)
                            .build();
                }))
                .collect(Collectors.toList());

        List<BookListBySearchResponseDto> bookList = futures.stream()
                .map(CompletableFuture::join)  // CompletableFuture의 결과를 가져옴
                .collect(Collectors.toList());

        log.info("검색된 도서 개수:::::::::::::::::: " + bookList.size());

        return bookList;

    }

    @Override
    public List<BookListBySearchResponseDto> searchBookByGenreAndKeyword(int genreId, String keyword) {
        //genreDetailDict의 genreDictId가 genreId와 일치하는 book을 가져온다
        //  1. genreDetailDict에서 genreDictId가 genreId 와 일치하는 id 리스트를 가져온다
        List<GenreDictIdInfoMapping> genreDetailList = genreDetailDictRepository.findByGenreDictId(genreId);
        List<Integer> genreDictId = genreDetailList.stream()
                .map(GenreDictIdInfoMapping::getId)
                .collect(Collectors.toList());

        log.info("현재 검색된 세부 장르 개수::::::" + genreDictId.size());

        //  2. book에서 genreDetailDictId에 1번 리스트애들이 포함되어있는 book + 키워드에 해당하는 리스트를 가져온다
        //List<Book> books = bookRepository.findByGenreDetailDictIdInAndAuthorContainsOrTitleContains(genreDictId, keyword, keyword);
        List<Book> books = bookRepository.findByGenreDetailDictIdInAndAuthorContainsOrTitleContains(genreDictId, keyword);

        List<CompletableFuture<BookListBySearchResponseDto>> futures = books.stream()
                .map(searchedBook -> CompletableFuture.supplyAsync(() -> {
                    int bookshelfCnt = bookshelfRepository.countByBookIdAndStateIn(searchedBook.getId(), List.of(State.WISH, State.READING, State.DONE));

                    return BookListBySearchResponseDto.builder()
                            .bookId(searchedBook.getId())
                            .bookImageUrl(searchedBook.getImageUrl())
                            .bookTitle(searchedBook.getTitle())
                            .author(searchedBook.getAuthor())
                            .publishDate(searchedBook.getPublishDate())
                            .score(searchedBook.getScore())
                            .bookShelfCnt(bookshelfCnt)  // bookShelfCnt를 계산한 결과를 설정
                            .build();
                }))
                .collect(Collectors.toList());

        List<BookListBySearchResponseDto> bookList = futures.stream()
                .map(CompletableFuture::join)  // CompletableFuture의 결과를 가져옴
                .collect(Collectors.toList());

        log.info("검색된 도서 개수:::::::::::::::::: " + bookList.size());

        return bookList;


    }
}
