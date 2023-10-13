package com.ssafy.bookwave.diary.service;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.diary.domain.Diary;
import com.ssafy.bookwave.diary.dto.request.DiaryModifyRequestDto;
import com.ssafy.bookwave.diary.dto.request.DiaryRegistRequestDto;
import com.ssafy.bookwave.diary.dto.response.DiaryDetailResponseDto;
import com.ssafy.bookwave.diary.repository.DiaryRepository;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.DiaryFastApiResponse;
import com.ssafy.bookwave.member.repository.FollowRepository;
import com.ssafy.bookwave.member.repository.MemberGenreRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiaryServiceImpl implements DiaryService {

    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final FollowRepository followRepository;
    private final MemberGenreRepository memberGenreRepository;
    private final RedisTemplate<String, Map<String,Object>> redisTemplate;
    private final RestTemplate restTemplate;
    // 리마인더 글 작성
    @Override
    @Transactional
    public void regist(Member member, DiaryRegistRequestDto diaryRegistRequestDto) {

        // FastAPI 서비스로 데이터 전송
        DiaryFastApiResponse diaryFastApiResponse = callFastApiService(member,diaryRegistRequestDto);

        Integer bookId = diaryFastApiResponse.getId();
        String emotion = diaryFastApiResponse.getState();
        Book todayBook = bookRepository.findById(bookId).get();

        //diary 저장
        Diary diary = Diary.builder()
                .member(member)
                .content(diaryRegistRequestDto.getDiaryContent())
                .color(diaryRegistRequestDto.getColor())
                .emotion(emotion)
                .book(todayBook)
                .build();
        diaryRepository.save(diary);

        //Redis에 저장
        saveToRedis(member.getSocialId(),bookId,emotion);

//        System.out.println(redisTemplate.opsForValue().get(member.getSocialId()));
    }

    private DiaryFastApiResponse callFastApiService(Member member, DiaryRegistRequestDto diaryRegistRequestDto){
        String fastApiUrl = "https://j9b203.p.ssafy.io/rec/emotion";

        List<Integer> favoriteGenres = memberGenreRepository.findDetailDictIdsByMemberId(member.getId());
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("member_id", member.getId());
        requestBody.put("content", diaryRegistRequestDto.getDiaryContent());
        requestBody.put("genre_detail_ids", favoriteGenres);

        ResponseEntity<DiaryFastApiResponse> responseEntity = restTemplate.postForEntity(fastApiUrl, requestBody, DiaryFastApiResponse.class);
        return responseEntity.getBody();
    }

    private void saveToRedis(String socialId, Integer bookId, String emotion){
        Map<String, Object> todayEmotion = new HashMap<>();
        if(socialId.equals("3027710449")){
            System.out.println("제혁이다");
            todayEmotion.put("bookId",12230);
            todayEmotion.put("emotion","분노");
        }
        else{
            todayEmotion.put("bookId",bookId);
            todayEmotion.put("emotion",emotion);
        }

        //Redis 만료 시간 설정
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime midnight = LocalDateTime.of(now.toLocalDate().plusDays(1), LocalTime.MIDNIGHT);
        Duration duration = Duration.between(now, midnight);
        redisTemplate.opsForValue().set(socialId,todayEmotion,duration);
    }

    @Override
    public DiaryDetailResponseDto getDetail(int memberId, int diaryId) {

        Optional<Diary> diary = diaryRepository.findById(diaryId);

        return diary.map(d -> DiaryDetailResponseDto.builder()
                        .diaryWriterMemberId(d.getMember().getId())
                        .memberNickname(d.getMember().getNickname())
                        .memberProfileUrl(d.getMember().getProfileImgPath())
                        .diaryId(diaryId)
                        .diaryDate(d.getCreatedDate())
                        .diaryContent(d.getContent())
                        .diaryColor(d.getColor())
                        .todayBookId(d.getBook() != null ? d.getBook().getId() : null)
                        .todayBookTitle(d.getBook() != null ? d.getBook().getTitle() : null)
                        .todayBookAuthor(d.getBook() != null ? d.getBook().getAuthor() : null)
                        .todayBookImgUrl(d.getBook() != null ? d.getBook().getImageUrl() : null)
                        .build())
                .orElse(null); // 다이어리가 존재하지 않을 경우 null 반환
    }

    @Override
    @Transactional
    public void modify(DiaryModifyRequestDto diaryModifyRequestDto) {

        Optional<Diary> diary = diaryRepository.findById(diaryModifyRequestDto.getDiaryId());

        if(diary.isEmpty()) return;
        diary.get().update(diaryModifyRequestDto);
    }

    @Override
    @Transactional
    public void delete(int diaryId) {

        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if(diary.isEmpty()) return;

        diaryRepository.delete(diary.get());

    }
}
