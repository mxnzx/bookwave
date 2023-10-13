package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.domain.BookshelfBook;
import com.ssafy.bookwave.book.dto.response.BookBookshelfResponseDto;
import com.ssafy.bookwave.book.dto.response.BookResponseDto;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.book.repository.BookshelfRepository;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.member.domain.Follow;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.domain.MemberBookScore;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import com.ssafy.bookwave.member.repository.FollowRepository;
import com.ssafy.bookwave.member.repository.MemberBookScoreRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.record.domain.Comment;
import com.ssafy.bookwave.record.domain.RecordLike;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.record.dto.request.RecordBookshelfResponseDto;
import com.ssafy.bookwave.record.dto.request.RecordCommentRequest;
import com.ssafy.bookwave.record.dto.request.RecordModifyRequest;
import com.ssafy.bookwave.record.dto.request.RecordRegistRequestDto;
import com.ssafy.bookwave.record.dto.response.*;
import com.ssafy.bookwave.record.repository.CommentRepository;
import com.ssafy.bookwave.record.repository.RecordLikeRepository;
import com.ssafy.bookwave.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class RecordServiceImpl implements RecordService {

    private final MemberRepository memberRepository;
    private final MemberValidator memberValidator;
    private final RecordRepository recordRepository;
    private final BookshelfRepository bookshelfRepository;
    private final BookRepository bookRepository;
    private final RecordLikeRepository likeRepository;
    private final CommentRepository commentRepository;
    private final FollowRepository followRepository;
    private final RecordLikeRepository recordLikeRepository;
    private final MemberBookScoreRepository memberBookScoreRepository;

    @Value("${file.record-server-domain}")
    private String serverDomain;

    /*
        1. 회원체크
        2. 회원의 책장 목록 전부 불러오기
        3. 불러온 책장 목록 중 state가 1인거는 읽는중인 리스트
        4. 불러온 책장 목록 중 state가 2인거는 읽은 리스트
        5. Response로 리스트 두개 보내주기

     */
    @Override
    public RecordBookshelfResponseDto getBookshelf(int memberId) {
        // 로그인한 회원
        Member member = getMember(memberId);

        // 회원의 책장 목록 불러오기
        List<BookshelfBook> bookshelfBook = bookshelfRepository.findByMemberId(member.getId());

        List<BookBookshelfResponseDto> readingBook = new ArrayList<>();
        List<BookBookshelfResponseDto> doneBook = new ArrayList<>();

        for (BookshelfBook book : bookshelfBook) {
            // 읽는중인 책
            if (book.getState().getValue() == 1) {
                BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                        .bookId(book.getBook().getId())
                        .isbn(book.getBook().getIsbn())
                        .bookImageUrl(book.getBook().getImageUrl())
                        .bookTitle(book.getBook().getTitle())
                        .bookAuthor(book.getBook().getAuthor())
                        .build();
                readingBook.add(bookBookshelfResponseDto);
            }
            // 읽은 책
            if (book.getState().getValue() == 2) {
                BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                        .bookId(book.getBook().getId())
                        .isbn(book.getBook().getIsbn())
                        .bookImageUrl(book.getBook().getImageUrl())
                        .bookTitle(book.getBook().getTitle())
                        .bookAuthor(book.getBook().getAuthor())
                        .build();
                doneBook.add(bookBookshelfResponseDto);
            }
        }

        // 읽는중인 책과 읽은 책 리스트 두개를 담는 Dto
        RecordBookshelfResponseDto recordBookshelfResponseDto = RecordBookshelfResponseDto.builder()
                .readingBookList(readingBook)
                .doneBookList(doneBook)
                .build();


        return recordBookshelfResponseDto;

    }


    // 레코드 글 작성 시 책장목록에서 선택 한 도서 가져오기
    @Override
    public BookBookshelfResponseDto getWriteRecordBook(int memberId, int bookId) {

        Member member = getMember(memberId);

        Optional<Book> book = bookRepository.findById(bookId);
        // 멤버 책장 테이블에서 책의 상태값 조회
        Optional<BookshelfBook> bookShelfBook = Optional.ofNullable(bookshelfRepository.findByBookIdAndMemberId(bookId, memberId));
        int state = bookShelfBook.get().getState().getValue();

        BookBookshelfResponseDto bookBookshelfResponseDto = BookBookshelfResponseDto.builder()
                .bookId(book.get().getId())
                .isbn(book.get().getIsbn())
                .bookImageUrl(book.get().getImageUrl())
                .bookTitle(book.get().getTitle())
                .bookAuthor(book.get().getAuthor())
                .state(state)
                .build();

        return bookBookshelfResponseDto;
    }

    // 레코드 글 등록하기
    @Override
    public void registRecord(RecordRegistRequestDto recordRegistRequest, MultipartFile recordPicture, Member member) throws IOException {

        Optional<Book> book = bookRepository.findById(recordRegistRequest.getBookId());

        if (recordPicture == null || recordPicture.isEmpty()) {

            Record record = Record.builder()
                    .member(member)
                    .book(book.get())
                    .name(recordRegistRequest.getTitle())
                    .content(recordRegistRequest.getContent())
                    .imageUrl(book.get().getImageUrl())
                    .startDate(LocalDate.parse(recordRegistRequest.getStartDate()))
                    .endDate(LocalDate.parse(recordRegistRequest.getEndDate()))
                    .score(recordRegistRequest.getStar())
                    .build();

            recordRepository.save(record);
        } else {

            String path = storeFile(member.getId(), recordPicture);

            Record record = Record.builder()
                    .member(member)
                    .book(book.get())
                    .name(recordRegistRequest.getTitle())
                    .content(recordRegistRequest.getContent())
                    .imageUrl(path)
                    .startDate(LocalDate.parse(recordRegistRequest.getStartDate()))
                    .endDate(LocalDate.parse(recordRegistRequest.getEndDate()))
                    .score(recordRegistRequest.getStar())
                    .build();
            recordRepository.save(record);
        }

        // 비동기 호출
        callFastApi(recordRegistRequest, book);
    }

    @Async
    public CompletableFuture<Void> callFastApi(RecordRegistRequestDto recordRegistRequest, Optional<Book> book) {
        RestTemplate restTemplate = new RestTemplate();
        String fastApiUrl = "https://j9b203.p.ssafy.io/rec/bookwave";

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("book_id", recordRegistRequest.getBookId());
        requestBody.put("isbn", book.get().getIsbn());
        requestBody.put("content", recordRegistRequest.getContent());

        ResponseEntity<EmotionResponseDto> emotionResponse = restTemplate.postForEntity(fastApiUrl, requestBody, EmotionResponseDto.class);

        EmotionResponseDto body = emotionResponse.getBody();
        Book findBook = bookRepository.findById(body.getId()).get();
        findBook.updateEmotion(body.getEmotion());


        return CompletableFuture.completedFuture(null);
    }


    // 레코드 상세보기
    @Override
    public RecordDetailResponseDto getRecordDetail(int recordId, Member findMember) {

        Optional<Record> record = recordRepository.findById(recordId);

        BookResponseDto bookResponseDto = BookResponseDto.builder()
                .id(record.get().getBook().getId())
                .title(record.get().getBook().getTitle())
                .imageUrl(record.get().getBook().getImageUrl())
                .author(record.get().getBook().getAuthor())
                .score(record.get().getBook().getScore())
                .build();

        // period
        int daysDifference = (int)ChronoUnit.DAYS.between(record.get().getStartDate(), record.get().getEndDate());


        Optional<RecordLike> like = likeRepository.findByRecordAndMember(record.get(), findMember);
        boolean isLike;
        if (like.isPresent()) {
            isLike = true;
        } else {
            isLike = false;
        }

        int likeCount = (int) likeRepository.countByRecord(record.get());
        int commentCount = (int) commentRepository.countByRecord(record.get());

        boolean isFollow;
        if(findMember.getId() != record.get().getMember().getId()){
            isFollow = checkFollowStatus(record.get().getMember().getId(), findMember.getId());
        }
        else{
            isFollow = false;
        }

        List<Comment> comments = commentRepository.findByRecord(record.get());

        List<CommentResponseDto> commentResponseDtos = comments.stream()
                .map(CommentResponseDto::new)  // Comment 엔터티에서 DTO로 변환
                .collect(Collectors.toList());


        //레코드 상세보기 반환 Dto
        RecordDetailResponseDto recordDetailResponseDto = RecordDetailResponseDto.builder()
                .recordWriterMemberId(record.get().getMember().getId())
                .recordWriterImageUrl(record.get().getMember().getProfileImgPath())
                .nickname(record.get().getMember().getNickname())
                .recordId(recordId)
                .bookId(bookResponseDto.getId())
                .bookTitle(bookResponseDto.getTitle())
                .bookAuthor(bookResponseDto.getAuthor())
                .bookImageUrl(bookResponseDto.getImageUrl())
                .recordTitle(record.get().getName())
                .recordImageUrl(record.get().getImageUrl())
                .period(daysDifference)
                .score(record.get().getScore())
                .recordContent(record.get().getContent())
                .isLike(isLike)
                .recordLikeCnt(likeCount)
                .recordCommentCnt(commentCount)
                .isFollow(isFollow)
                .createdDate(record.get().getCreatedDate())
                .startDate(record.get().getStartDate().atStartOfDay())
                .endDate(record.get().getEndDate().atStartOfDay())
                .commentList(commentResponseDtos)
                .build();


        return recordDetailResponseDto;
    }

    // 레코드 글 수정하기
    @Override
    public void modifyRecord(RecordModifyRequest recordModifyRequest, MultipartFile recordPicture, Member findMember) throws IOException {
        Optional<Record> record = recordRepository.findById(recordModifyRequest.getRecordId());

        if(recordPicture.isEmpty()) {
            // 파일이 없고 , 기존 이미지를 삭제 했을 때
            if(recordModifyRequest.getRecordImageUrl() == null){
                record.get().updateImageUrl(record.get().getBook().getImageUrl());
            }
            // 파일이 없고 , 기존 이미지를 삭제 안했을 때
            else{
                record.get().updateImageUrl(record.get().getImageUrl());
            }

        }
        // 파일이 있을 때
        else{
            String path = storeFile(findMember.getId(), recordPicture);
            record.get().updateImageUrl(path);
        }

        record.get().updateName(recordModifyRequest.getTitle());
        record.get().updateContent(recordModifyRequest.getContent());
        record.get().updateStartDate(LocalDate.parse(recordModifyRequest.getStartDate()));
        record.get().updateEndDate(LocalDate.parse(recordModifyRequest.getEndDate()));
        record.get().updateScore(recordModifyRequest.getStar());

        recordRepository.save(record.get());
    }

    @Override
    public void deleteRecord(int recordId, Member findMember) {

        recordRepository.deleteById(recordId);
    }

    @Override
    public void registRecordComment(RecordCommentRequest recordCommentRequest, Member findMember) {

        Optional<Record> record = recordRepository.findById(recordCommentRequest.getRecordId());

        Comment comment = Comment.builder()
                .member(findMember)
                .record(record.get())
                .content(recordCommentRequest.getContent())
                .build();

        commentRepository.save(comment);
    }

    @Override
    public RecordModifyInfoResponseDto getModifyInfo(int recordId, Member findMember) {

        Optional<Record> record = recordRepository.findById(recordId);

        BookResponseDto bookResponseDto = BookResponseDto.builder()
                .title(record.get().getBook().getTitle())
                .imageUrl(record.get().getBook().getImageUrl())
                .author(record.get().getBook().getAuthor())
                .score(record.get().getScore())
                .build();

        RecordModifyInfoResponseDto recordModifyInfoResponseDto = RecordModifyInfoResponseDto.builder()
                .bookImageUrl(bookResponseDto.getImageUrl())
                .bookTitle(bookResponseDto.getTitle())
                .bookAuthor(bookResponseDto.getAuthor())
                .recordImageUrl(record.get().getImageUrl())
                .score(record.get().getScore())
                .startDate(record.get().getStartDate().atStartOfDay())
                .endDate(record.get().getEndDate().atStartOfDay())
                .recordTitle(record.get().getName())
                .recordContent(record.get().getContent())
                .recordWriterMemberId(record.get().getMember().getId())
                .build();

        return recordModifyInfoResponseDto;
    }

    @Override
    public void deleteComment(int commentId, Member findMember) {

        commentRepository.deleteById(commentId);
    }

    @Override
    @Transactional
    public void deleteAllComments(int recordId, Member findMember) {
        commentRepository.deleteAllByRecordId(recordId);
    }

    @Override
    @Transactional
    public void deleteAllLike(int recordId, Member findMember) {
        recordLikeRepository.deleteAllByRecordId(recordId);
    }

    @Override
    @Transactional
    public void calScore(RecordRegistRequestDto recordRegistRequest, Member findMember) {
        Optional<Book> book = bookRepository.findById(recordRegistRequest.getBookId());

        // 별점 저장하기
        MemberBookScore memberBookScore = MemberBookScore.builder()
                .member(findMember)
                .book(book.get())
                .score(recordRegistRequest.getStar())
                .build();

        memberBookScoreRepository.save(memberBookScore);

        // 저장된 별점 포함해서 책에 다시 평균 별점 저장하기
        double averageScore = memberBookScoreRepository.findAverageScoreByBookId(recordRegistRequest.getBookId());

        book.get().updateScore(averageScore);
        bookRepository.save(book.get());


    }

    @Override
    public BaseResponseDto getFidMemberList(Member findMember) {

        List<Member> allMember = memberRepository.findAll();

        List<MemberResponseDto> memberDtoList = new ArrayList<>();
        for (Member m: allMember) {

           memberDtoList.add(MemberResponseDto.builder()
                   .memberId(m.getId())
                   .nickname(m.getNickname())
                   .bbtiTypeId(m.getBbtiType().getId())
                   .imageUrl(m.getProfileImgPath())
                   .build());
        }

        return BaseResponseDto.builder()
                .success(true)
                .message("피드 사용자 정보를 불러오기 성공")
                .data(memberDtoList)
                .build()
                ;
    }

    @Override
    public BaseResponseDto getFidList(int memberId, Member findMember) {

        Map<Integer, Integer> map = new TreeMap<>();
        List<Follow> follows = followRepository.findByFollowingId(memberId);

        // 팔로잉하는 사용자들의 ID만 추출합니다.
        List<Integer> followerIds = new ArrayList<>();
        for (Follow follow : follows) {
            followerIds.add(follow.getFollower().getId());
        }
        List<Record> recordIdByFollow = recordRepository.findByMemberIdIn(followerIds);
        for (Record record : recordIdByFollow) {
            map.put(record.getId(),record.getId());
        }
        List<Integer> recordIdByBbti = recordRepository.findRecordIdsBySameBbtiTypeId(memberId);
        for (int record : recordIdByBbti) {
            map.put(record,record);
        }
        List<Integer> recordIds = new ArrayList<>(map.values());
        Collections.reverse(recordIds);

        return BaseResponseDto.builder()
                .success(true)
                .message("독후감 리스트 불러오기 성공")
                .data(RecordListResponseDto.builder().recordIdList(recordIds).build())
                .build();
    }


    private boolean checkFollowStatus(Integer followerId, Integer followeeId) {
        memberValidator.checkDifferentMembers(followerId, followeeId);

        Member follower = getMember(followerId);
        Member followee = getMember(followeeId);
        Optional<Follow> follow = followRepository.findByFollowerAndFollowing(follower, followee);

        if (follow.isPresent()) {
            return true;
        } else {
            return false;
        }
    }


    // 독후감 사진 등록
    private String storeFile(Integer memberId, MultipartFile recordPicture) throws IOException {
        String uploadDir = "/bookwave/upload/images/record/";
        String originalFileName = recordPicture.getOriginalFilename();
        String fileName = memberId + "_" + originalFileName;

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;
        File destFile = new File(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                System.out.println("디렉토리 생성  String storeFile(String memberId, MultipartFile file) throws IOException;성공");
            } else {
                System.out.println("디렉토리 생성 실패");
            }
        }

        recordPicture.transferTo(destFile);
        String realPath = "https://j9b203.p.ssafy.io/img/record/" + fileName;
        log.info("서비스 >>> 파일 저장 성공! filePath : " + filePath);
        return realPath;
    }

    private Member getMember(int memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        memberValidator.checkMember(member, memberId);
        return member.get();
    }


}
