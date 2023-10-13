package com.ssafy.bookwave.bbti.service;

import com.ssafy.bookwave.bbti.domain.BbtiQuestion;
import com.ssafy.bookwave.bbti.domain.BbtiType;
import com.ssafy.bookwave.bbti.domain.BbtiTypeElement;
import com.ssafy.bookwave.bbti.dto.request.BbtiRequestDto;
import com.ssafy.bookwave.bbti.dto.response.BbtiQuestionResponseDto;
import com.ssafy.bookwave.bbti.dto.response.BbtiResponseDto;
import com.ssafy.bookwave.bbti.repository.BbtiQuesitonRepository;
import com.ssafy.bookwave.bbti.repository.BbtiRepository;
import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.global.exception.validator.MemberValidator;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BbtiServiceImpl implements BbtiService{

    private final BbtiQuesitonRepository bbtiQuesitonRepository;
    private final MemberRepository memberRepository;
    private final MemberValidator memberValidator;
    private final BbtiRepository bbtiRepository;
    private final RecordRepository recordRepository;
    private final BookRepository bookRepository;
    @Override
    public BaseResponseDto getBbtiQuesiton() {
        List<BbtiQuestion> all = bbtiQuesitonRepository.findAll();

        List<BbtiQuestionResponseDto> bbtiList = new ArrayList<>();
        for (BbtiQuestion bq:all) {
            bbtiList.add(BbtiQuestionResponseDto.builder()
                    .question(bq.getContent())
                    .detail1(bq.getBbtiTypeElements().get(0).getContent())
                    .code1(bq.getBbtiTypeElements().get(0).getCode())
                    .detail2(bq.getBbtiTypeElements().get(1).getContent())
                    .code2(bq.getBbtiTypeElements().get(1).getCode())
                    .build());

        }

        return BaseResponseDto.builder()
                .success(true)
                .message("bbti 설문 질문 불러오기 성공")
                .data(bbtiList).build();
    }

    @Override
    public BaseResponseDto registBbti(int memberId, List<String> bbtiList) {

        Optional<Member> member = memberRepository.findById(memberId);
        memberValidator.checkMember(member,memberId);
        Member fidnMember = member.get();

        int bbtiTypeId = selectBbtiType(bbtiList);
        BbtiType bbtiType = bbtiRepository.findById(bbtiTypeId).get();

        fidnMember.updateBbti(bbtiType);

        Record randomRecord = recordRepository.findRandomRecordBySameBbtiType(memberId, PageRequest.of(0, 1)).getContent().get(0);


        Book book = bookRepository.findById(randomRecord.getBook().getId()).get();

        return BaseResponseDto.builder()
                .success(true)
                .message("bbti 등록이 완료되었습니다")
                .data(BbtiResponseDto.builder()
                        .content(bbtiType.getContent())
                        .name(bbtiType.getName())
                        .bookId(book.getId())
                        .author(book.getAuthor())
                        .title(book.getTitle())
                        .imageUrl(book.getImageUrl())
                        .build())
                .build();
    }

    private int selectBbtiType(List<String> bbtiList) {

        int sumA=0,sumB=0,sumC=0,sumD=0,sumE=0,sumF=0;
        int bbtiTypeId=1;
        for (String code: bbtiList) {
            if(code.equals("A")) sumA++;
            else if(code.equals("B")) sumB++;
            else if(code.equals("C")) sumC++;
            else if(code.equals("D")) sumD++;
            else if(code.equals("E")) sumE++;
            else if(code.equals("F")) sumF++;
        }
        if (sumA >= 2 && sumC >= 2 && sumF >= 2) {
            bbtiTypeId=2;
        }
        else if (sumA >= 2 && sumC >= 2 && sumE >= 2) {
            bbtiTypeId=3;
        }
        else if (sumA >= 2 && sumD >= 2 && sumF >= 2) {
            bbtiTypeId=4;
        }
        else if (sumA >= 2 && sumD >= 2 && sumE >= 2) {
            bbtiTypeId=5;
        }
        else if (sumB >= 2 && sumC >= 2 && sumE >= 2) {
            bbtiTypeId=6;
        }
        else if (sumB >= 2 && sumC >= 2 && sumF >= 2) {
            bbtiTypeId=7;
        }
        else if (sumB >= 2 && sumD >= 2 && sumE >= 2) {
            bbtiTypeId=8;
        }
        else if (sumB >= 2 && sumD >= 2 && sumF >= 2) {
            bbtiTypeId=9;
        }
        return bbtiTypeId;
    }
}
