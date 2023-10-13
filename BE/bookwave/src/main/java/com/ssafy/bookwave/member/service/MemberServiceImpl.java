package com.ssafy.bookwave.member.service;

import com.ssafy.bookwave.bbti.domain.BbtiType;
import com.ssafy.bookwave.bbti.dto.response.BbtiResponseDto;
import com.ssafy.bookwave.bbti.repository.BbtiRepository;
import com.ssafy.bookwave.diary.domain.Diary;
import com.ssafy.bookwave.diary.repository.DiaryRepository;
import com.ssafy.bookwave.global.auth.jwt.JwtTokenProvider;
import com.ssafy.bookwave.global.auth.oauth2.kakao.KakaoMemberDto;
import com.ssafy.bookwave.global.auth.oauth2.kakao.KakaoOAuth2;
import com.ssafy.bookwave.global.auth.oauth2.naver.NaverMemberDto;
import com.ssafy.bookwave.global.auth.oauth2.naver.NaverOAuth2;
import com.ssafy.bookwave.global.exception.CustomException;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.global.util.FileUploadUtil;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.FileDto;
import com.ssafy.bookwave.member.dto.LoginDto;
import com.ssafy.bookwave.member.dto.TokenDto;
import com.ssafy.bookwave.member.dto.request.MemberInfoUpdateRequestDto;
import com.ssafy.bookwave.member.dto.response.*;
import com.ssafy.bookwave.member.enums.Gender;
import com.ssafy.bookwave.member.enums.Role;
import com.ssafy.bookwave.member.enums.SocialType;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.record.repository.RecordRepository;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MemberServiceImpl implements MemberService {
    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${file.member-server-domain}")
    private String serverDomain;

    @Value("${file.member-url-path}")
    private String urlPath;


    private final KakaoOAuth2 kakaoOAuth2;
    private final NaverOAuth2 naverOAuth2;
    private final MemberRepository memberRepository;
    //    private final ShowInfoRepository showInfoRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final FileUploadUtil fileUploadUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberValidator memberValidator;
    private final BbtiRepository bbtiRepository;
    private final RecordRepository recordRepository;
    private final DiaryRepository diaryRepository;

    // authorizedCode로 가입된 사용자 조회
    @Transactional
    public LoginDto findKakaoMemberByAuthorizedCode(String authorizedCode, String redirectUri) {
        // 카카오 OAuth2 를 통해 카카오 사용자 정보 조회
        KakaoMemberDto kakaoUserDto = kakaoOAuth2.getMemberInfo(authorizedCode, redirectUri);
        String email = kakaoUserDto.getEmail();

        String socialId = kakaoUserDto.getSocialId();
        Optional<Member> optionalMember = memberRepository.findBySocialId(socialId);

        if (optionalMember.isPresent()) {
            return LoginDto.builder()
                    .id(optionalMember.get().getId())
                    .socialId(optionalMember.get().getSocialId())
                    .socialType(optionalMember.get().getSocialType())
                    .nickname(optionalMember.get().getNickname())
                    .firstLogin(false)
                    .build();
        }
        // 가입된 유저가 아니라면 회원가입 진행
        else {

            // 성별 남성 : F, 여성 : M
            String kakaoGender = kakaoUserDto.getGender();
            System.out.println("kakaoGender = " + kakaoGender);
            Gender gender;
            if (kakaoGender.equals("male")) {
                gender = Gender.M;
            } else if (kakaoGender.equals("female")) {
                gender = Gender.F;
            } else {
                gender = null;
            }
            System.out.println(gender);

            Optional<BbtiType> bbtiType = bbtiRepository.findById(1);

            Member member = Member.builder()
                    .bbtiType(bbtiType.orElseThrow(() -> new RuntimeException("BbtiType not found")))
                    .email(email)
                    .nickname("")
                    .gender(gender)
                    .profileImgName(null)
                    .profileImgPath(null)
                    .socialId(socialId)
                    .socialType(SocialType.KAKAO)
                    .role(Role.USER)
                    .build();
            System.out.println(member.toString());
            Member saveMember = memberRepository.save(member);

            return LoginDto.builder()
                    .id(member.getId())
                    .socialId(member.getSocialId())
                    .socialType(member.getSocialType())
                    .nickname(member.getNickname())
                    .firstLogin(true)
                    .build();
        }
    }

    @Transactional
    public LoginDto findNaverMemberByAuthorizedCode(String authorizedCode, String naverState) {
        // 네이버 OAuth2 를 통해 네이버 사용자 정보 조회
        NaverMemberDto naverMemberDto = naverOAuth2.getMemberInfo(authorizedCode, naverState);
        String email = naverMemberDto.getEmail();

        String socialId = naverMemberDto.getSocialId();
        Optional<Member> optionalMember = memberRepository.findBySocialId(socialId);

        if (optionalMember.isPresent()) {
            return LoginDto.builder()
                    .id(optionalMember.get().getId())
                    .socialId(optionalMember.get().getSocialId())
                    .socialType(optionalMember.get().getSocialType())
                    .nickname(optionalMember.get().getNickname())
                    .firstLogin(false)
                    .build();
        }
        // 가입된 유저가 아니라면 회원가입 진행

        else {
            // 성별 남성 : F, 여성 : M
            String naverGender = naverMemberDto.getGender();
            Gender gender;
            if (naverGender.equals("male")) {
                gender = Gender.M;
            } else if (naverGender.equals("female")) {
                gender = Gender.F;
            } else {
                gender = null;
            }

            Optional<BbtiType> bbtiType = bbtiRepository.findById(1);

            Member member = Member.builder()
                    .bbtiType(bbtiType.orElseThrow(() -> new RuntimeException("BbtiType not found")))
                    .email(email)
                    .nickname("")
                    .gender(gender)
                    .profileImgName(null)
                    .profileImgPath(null)
                    .socialId(socialId)
                    .socialType(SocialType.KAKAO)
                    .role(Role.USER)
                    .build();
            Member saveMember = memberRepository.save(member);

            return LoginDto.builder()
                    .id(member.getId())
                    .socialId(member.getSocialId())
                    .socialType(member.getSocialType())
                    .nickname(member.getNickname())
                    .firstLogin(true)
                    .build();
        }
    }

    @Transactional
    public TokenDto reissue(String refreshToken) {

        log.info("재발급서비스 진입!!!");

        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, 403, "토큰에 문제 생겼어요");
        }

        String id = Jwts.parser().setSigningKey(secretKey.getBytes())
                .parseClaimsJws(refreshToken).getBody().getId();


        Member findMember = memberRepository.findById(Integer.parseInt(id))
                .orElse(null);
        if (findMember == null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "일치하는 유저가 없습니다");
        }

        String redisRefreshToken = redisTemplate.opsForValue().get(Integer.toString(findMember.getId()));

        if (!refreshToken.equals(redisRefreshToken)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -1, "refresh Token 불일치");
        }
        String newAccessToken = jwtTokenProvider.createAccessToken(findMember.getId(), findMember.getSocialId(), findMember.getSocialType());
        String newRefreshToken = jwtTokenProvider.createRefreshToken(findMember.getId());

        jwtTokenProvider.storeRefreshToken(findMember.getId(), newRefreshToken);
        TokenDto tokenDto = new TokenDto();
        tokenDto.setAccessToken(newAccessToken);
        tokenDto.setRefreshToken(newRefreshToken);
        tokenDto.setId(findMember.getId());
        return tokenDto;
    }

    @Transactional(readOnly = true)
    public Member findMemberByJwtToken(String token) {

        String id = String.valueOf(Jwts.parser().setSigningKey(secretKey.getBytes())
                .parseClaimsJws(token).getBody().get("id"));

        return memberRepository.findById(Integer.parseInt(id))
                .orElseThrow(() -> new IllegalArgumentException("회원아이디 \"" + id + " \" 에해당하는 사용자가 존재하지 않습니다."));
    }

    @Transactional(readOnly = true)
    public MemberInfoResponseDto getMemberInfo(Member findMember) {

        return MemberInfoResponseDto.builder()
                .member(findMember)
                .build();

    }

    @Override
    public MemberAllInfoResponse getALlMemberInfo(Member findMember) {

        MemberAllInfoResponse memberAllInfoResponse = MemberAllInfoResponse.builder()
                .id(findMember.getId())
                .bbtiType(findMember.getBbtiType().getId())
                .email(findMember.getEmail())
                .nickname(findMember.getNickname())
                .gender(findMember.getGender().name())
                .profileImgName(findMember.getProfileImgName())
                .profileImgPath(findMember.getProfileImgPath())
                .socialId(findMember.getSocialId())
                .socialType(findMember.getSocialType())
                .role(findMember.getRole().getValue())
                .build();
        return memberAllInfoResponse;
    }

    @Override
    public MyPageMemberInfoResponse getMyPageMemberInfo(int memberId) {

        Optional<Member> member = memberRepository.findById(memberId);
        return member.map(value -> MyPageMemberInfoResponse.builder()
                .memberId(value.getId())
                .nickname(value.getNickname())
                .followerCnt(value.getFollowers().size())
                .followingCnt(value.getFollowings().size())
                .profileImgPath(value.getProfileImgPath())
                .build()).orElse(null);
    }

    @Override
    public MyPageRecordResponse getMyPageRecord(int memberId) {
        List<Record> myRecordList = recordRepository.findByMemberId(memberId);
        List<MyPageRecordDto>  myPageRecordDtos = new ArrayList<>();
        for(Record record: myRecordList){
            MyPageRecordDto myPageRecordDto = MyPageRecordDto.builder()
                    .recordImageUrl(record.getImageUrl())
                    .recordId(record.getId())
                    .build();
            myPageRecordDtos.add(myPageRecordDto);
        }
        return MyPageRecordResponse.builder().myPageRecords(myPageRecordDtos).build();
    }

    @Override
    public MyPageDiaryResponse getMyPageDiary(Member findMember) {
        List<Diary> myDiaryList = diaryRepository.findByMember(findMember);
        List<MyPageDiaryDto> myPageDiaryDtos = new ArrayList<>();
        for(Diary diary:myDiaryList){
            MyPageDiaryDto myPageDiaryDto = MyPageDiaryDto.builder()
                    .diaryId(diary.getId())
                    .diaryContent(diary.getContent())
                    .diaryColor((diary.getColor()))
                    .build();
            myPageDiaryDto.setDiaryDate(diary.getLastModifiedDate());
            myPageDiaryDtos.add(myPageDiaryDto);
        }

        return MyPageDiaryResponse.builder().diaryList(myPageDiaryDtos).build();
    }

    @Transactional
    public BaseResponseDto updateMemberInfo(Integer id, MemberInfoUpdateRequestDto mypageUpdateRequestDto, Member findMember, MultipartFile file) {

        if (findMember.getId() != id) {
            throw new IllegalArgumentException("잘못된 접근입니다");
        }

        if (mypageUpdateRequestDto == null) {

            if (file != null) {
                FileDto newfileDto = fileUploadUtil.uploadFile(file, findMember);
                findMember.updateMemberInfo(newfileDto);
                findMember.getProfileImgPath();
            }

        } else {
            if (mypageUpdateRequestDto.getNickname() == null || mypageUpdateRequestDto.getNickname().isBlank()) {
                throw new CustomException(HttpStatus.BAD_REQUEST, -101, "닉네임은 null이 될 수 없습니다");
            }

            if (!isValidNickname(mypageUpdateRequestDto.getNickname()) || (mypageUpdateRequestDto.getNickname().length() < 2 || mypageUpdateRequestDto.getNickname().length() >= 9)) {
                throw new CustomException(HttpStatus.BAD_REQUEST, -102, "닉네임 정규식 혹은 길이가 맞지 않습니다");
            }

            Optional<Member> findNickname = memberRepository.findByNickname(mypageUpdateRequestDto.getNickname());

            //닉네임 중복체크
            if (findNickname.isPresent() && !findMember.getNickname().equals(findNickname.get().getNickname())) {
                throw new CustomException(HttpStatus.BAD_REQUEST, -100, "닉네임이 중복되었습니다");
            }

            if (mypageUpdateRequestDto.getFile() != null) {
                FileDto newfileDto = fileUploadUtil.uploadFile(mypageUpdateRequestDto.getFile(), findMember);
                findMember.updateMemberInfo(mypageUpdateRequestDto, newfileDto);
                findMember.getProfileImgPath();
            } else {
                findMember.updateMemberInfo(mypageUpdateRequestDto);
            }
        }

        MemberUpdateResponseDto newMember = MemberUpdateResponseDto.builder()
                .member(findMember)
                .build();

        return BaseResponseDto.builder()
                .success(true)
                .message("사용자 정보를 수정하였습니다")
                .data(newMember)
                .build();


    }

    @Transactional
    public BaseResponseDto updateNickname(String nickname, Member member) {

        if (nickname == null || nickname.isBlank()) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -101, "닉네임은 null이 될 수 없습니다");
        }

        if (!isValidNickname(nickname) || (nickname.length() < 2 || nickname.length() >= 9)) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -102, "닉네임 정규식 혹은 길이가 맞지 않습니다");
        }

        Optional<Member> findNickname = memberRepository.findByNickname(nickname);

        //닉네임 중복체크
        if (findNickname.isPresent() && !member.getNickname().equals(findNickname.get().getNickname())) {
            throw new CustomException(HttpStatus.BAD_REQUEST, -100, "닉네임이 중복되었습니다");
        }

        member.updateNickname(nickname);

        return BaseResponseDto.builder()
                .success(true)
                .message("닉네임이 등록되었습니다")
                .data(NickNameResponseDto.builder()
                        .memberId(member.getId())
                        .nickname(member.getNickname())
                        .build())
                .build();
    }

    @Transactional(readOnly = true)
    public BaseResponseDto validNickname(String nickname, Member member) {
        Member findMember = memberRepository.findByNickname(nickname).orElse(null);
        //닉네임 중복
        if (findMember != null) {

            return BaseResponseDto.builder()
                    .success(false)
                    .message("닉네임이 중복되었습니다")
                    .data(NickNameResponseDto.builder()
                            .memberId(member.getId())
                            .nickname(nickname)
                            .build())
                    .build();
        }


        return BaseResponseDto.builder()
                .success(true)
                .message("닉네임이 사용가능합니다")
                .data(NickNameResponseDto.builder()
                        .memberId(member.getId())
                        .nickname(nickname)
                        .build())
                .build();
    }

    @Override
    public BaseResponseDto deleteMember(Member findMember) {
        System.out.println("탈퇴 서비스 임플");

        Role role = Role.DELETED;
        findMember.updateRole(role);


        return BaseResponseDto.builder()
                .success(true)
                .message("회원 탈퇴를 하셨습니다")
                .data(findMember.getId())
                .build();

    }


//    @Transactional
//    public BaseResponseDto deleteMember(Member findMember) {
//
//        memberRepository.delete(findMember);
//
//        return BaseResponseDto.builder()
//                .success(true)
//                .message("회원 탈퇴를 하셨습니다")
//                .data(findMember.getId())
//                .build();
//
//    }

    @Transactional(readOnly = true)
    public MemberInfoResponseDto getDetailMemberInfo(Integer id) {

        Optional<Member> targetMember = memberRepository.findById(id);

        memberValidator.checkMember(targetMember,id);

        return MemberInfoResponseDto.builder()
                .member(targetMember.get())
                .build();
    }

    private boolean isValidNickname(String nickname) {

        return Pattern.matches("[a-zA-Z0-9[가-힣]]*$", nickname);
    }
}
