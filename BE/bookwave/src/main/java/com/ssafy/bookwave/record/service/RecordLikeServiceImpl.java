package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.record.domain.Record;
import com.ssafy.bookwave.record.domain.RecordLike;
import com.ssafy.bookwave.record.dto.request.RecordLikeRequest;
import com.ssafy.bookwave.record.dto.response.RecordLikeRegistResponseDto;
import com.ssafy.bookwave.record.repository.RecordLikeRepository;
import com.ssafy.bookwave.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class RecordLikeServiceImpl implements RecordLikeService{

    private final RecordLikeRepository recordLikeRepository;
    private final RecordRepository recordRepository;

    @Override
    public RecordLikeRegistResponseDto changeLike(RecordLikeRequest recordLikeRequest, Member findMember) {

        Optional<RecordLike> isRecordLike = recordLikeRepository.findByMemberIdAndRecordId(findMember.getId(),recordLikeRequest.getRecordId());
        Optional<Record> record = recordRepository.findById(recordLikeRequest.getRecordId());

        RecordLikeRegistResponseDto recordLikeRegistResponseDto;

        // 좋아요를 이미 했다면
        if(isRecordLike.isPresent()){
            recordLikeRepository.delete(isRecordLike.get());

            recordLikeRegistResponseDto = RecordLikeRegistResponseDto.builder()
                    .isLike(false)
                    .build();

        }
        // 좋아요를 안헀다면
        else{
            RecordLike recordLike = RecordLike.builder()
                    .member(findMember)
                    .record(record.get())
                    .build();

            recordLikeRepository.save(recordLike);

            recordLikeRegistResponseDto = RecordLikeRegistResponseDto.builder()
                    .isLike(true)
                    .build();
        }


        return recordLikeRegistResponseDto;
    }
}
