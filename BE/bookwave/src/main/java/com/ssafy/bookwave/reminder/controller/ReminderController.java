package com.ssafy.bookwave.reminder.controller;

import com.ssafy.bookwave.global.util.ResponseTemplate;
import com.ssafy.bookwave.reminder.dto.request.ReminderDeleteRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderModifyRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderRegistRequestDto;
import com.ssafy.bookwave.reminder.dto.response.ReminderDetailResponseDto;
import com.ssafy.bookwave.reminder.enums.ReminderResponseMessage;
import com.ssafy.bookwave.reminder.service.ReminderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Tag(name = "Reminder", description = "리마인더 관련 API")
@RestController
@RequiredArgsConstructor
@EnableWebMvc
@Slf4j
@RequestMapping("/api/reminder")
public class ReminderController {

    private ReminderService reminderService;

    @Operation(summary = "리마인더 글 작성하기",
            description = "리마인더 글 작성하기 요청을 등록하는 API")
    @PostMapping("/regist")
    public ResponseEntity<ResponseTemplate<ReminderResponseMessage>> regist(@RequestBody ReminderRegistRequestDto reminderRegistRequest) throws Exception {

        reminderService.regist(reminderRegistRequest);

        return ResponseEntity.ok(
                ResponseTemplate.<ReminderResponseMessage>builder()
                        .result(true)
                        .msg(ReminderResponseMessage.REMINDER_REGIST_SUCCESS.getMessage())
                        .build()
        );
    }

    @Operation(summary = "리마인더 글 상세보기", description = "피드나 개인페이지에서 리마인더 클릭 시 상세보기 API")
    @GetMapping("/detail/{memberId}/{reminderId}")
    public ResponseEntity<ResponseTemplate<ReminderDetailResponseDto>> getDetail(@Validated @PathVariable("memberId") int memberId, @Validated @PathVariable("reminderId") int reminderId) {
        return new ResponseEntity<>(
                ResponseTemplate.<ReminderDetailResponseDto>builder()
                        .msg(ReminderResponseMessage.REMINDER_DETAIL_SUCCESS.getMessage())
                        .data(reminderService.getDetail(memberId, reminderId))
                        .result(true)
                        .build(),
                HttpStatus.OK);

    }

    @Operation(summary = "리마인더 글 수정하기", description = "리마인더 글 수정(내용,페이지,색상) API")
    @PutMapping("/modify")
    public ResponseEntity<ResponseTemplate<ReminderResponseMessage>> moidfy(@RequestBody ReminderModifyRequestDto reminderModifyRequest) {

        reminderService.modify(reminderModifyRequest);

        return ResponseEntity.ok(
                ResponseTemplate.<ReminderResponseMessage>builder()
                        .result(true)
                        .msg(ReminderResponseMessage.REMINDER_MODIFY_SUCCESS.getMessage())
                        .build()
        );
    }

    @Operation(summary = "리마인더 글 삭제하기", description = "리마인더 글 삭제(리마인더 아이디) API")
    @DeleteMapping("/delete")
    public ResponseEntity<ResponseTemplate<ReminderResponseMessage>> delete(@RequestBody ReminderDeleteRequestDto reminderDeleteRequest) {

        reminderService.delete(reminderDeleteRequest);

        return ResponseEntity.ok(
                ResponseTemplate.<ReminderResponseMessage>builder()
                        .result(true)
                        .msg(ReminderResponseMessage.REMINDER_DELETE_SUCCESS.getMessage())
                        .build()
        );
    }

}
