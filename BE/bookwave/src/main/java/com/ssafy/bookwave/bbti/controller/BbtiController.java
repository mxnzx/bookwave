package com.ssafy.bookwave.bbti.controller;

import com.ssafy.bookwave.bbti.dto.request.BbtiRequestDto;
import com.ssafy.bookwave.bbti.service.BbtiServiceImpl;
import com.ssafy.bookwave.member.dto.response.BaseResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "bbti", description = "bbti 관련 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bbti")
public class BbtiController {

    private final BbtiServiceImpl bbtiService;
    @Operation(summary = "bbti 질문 조회", description = "bbti 설문 질문 리스트 조회")
    @GetMapping("/bbti-question")
    public BaseResponseDto bbtiQuestion() {
        return bbtiService.getBbtiQuesiton();
    }
    @Operation(summary = "bbti 등록", description = "bbti 8유형으로 분류 후 등록")
    @PostMapping("/regist")
    public BaseResponseDto bbtiRegist(@RequestBody BbtiRequestDto bbtiRequestDto,HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token==null) return null;
        return bbtiService.registBbti(bbtiRequestDto.getMemberId(),bbtiRequestDto.getBbtiList());
    }
}
