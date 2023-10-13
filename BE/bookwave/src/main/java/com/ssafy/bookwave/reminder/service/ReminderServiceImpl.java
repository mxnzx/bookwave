package com.ssafy.bookwave.reminder.service;

import com.ssafy.bookwave.book.domain.Book;
import com.ssafy.bookwave.book.repository.BookRepository;
import com.ssafy.bookwave.member.domain.Follow;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.repository.FollowRepository;
import com.ssafy.bookwave.member.repository.MemberRepository;
import com.ssafy.bookwave.reminder.domain.Reminder;
import com.ssafy.bookwave.reminder.dto.request.ReminderDeleteRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderModifyRequestDto;
import com.ssafy.bookwave.reminder.dto.request.ReminderRegistRequestDto;
import com.ssafy.bookwave.reminder.dto.response.ReminderDetailResponseDto;
import com.ssafy.bookwave.reminder.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ReminderServiceImpl implements ReminderService{

    private final ReminderRepository reminderRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final FollowRepository followRepository;

    // 리마인더 글 작성
    @Override
    public void regist(ReminderRegistRequestDto reminderRegistRequest) throws Exception {
        Member member = memberRepository.findById(reminderRegistRequest.getMemberId()).orElseThrow(() -> new RuntimeException("일치하는 회원이 없습니다."));
        Book book = bookRepository.findById(reminderRegistRequest.getBookId()).orElseThrow(() -> new RuntimeException("일치하는 도서가 없습니다."));


        Reminder reminder = Reminder.builder()
                .member(member)
                .book(book)
                .content(reminderRegistRequest.getContent())
                .page(reminderRegistRequest.getPage())
                .color(reminderRegistRequest.getColor())
                .build();

        reminderRepository.save(reminder);
    }

    @Override
    public ReminderDetailResponseDto getDetail(int memberId, int reminderId) {
        // 로그인한 회원
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("일치하는 회원이 없습니다."));
        // 해당하는 리마인더
        Reminder reminder = reminderRepository.findById(reminderId).orElseThrow(() -> new RuntimeException("일치하는 리마인더가 없습니다."));
        // 리마인더 작성자
        Member reminderwritermember = memberRepository.findById(reminder.getMember().getId()).orElseThrow(() -> new RuntimeException("일치하는 리마인더 작성자가 없습니다."));
        // 해당하는 리마인더의 도서정보
        Book book = bookRepository.findById(reminder.getBook().getId()).orElseThrow(() -> new RuntimeException("일치하는 도서가 없습니다."));
        // 로그인 한 유저가 리마인더 글 작성자를 팔로우 하는지
        List<Follow> follow = followRepository.findByFollowingId(member.getId());
        boolean checkFollow = false;

        for (Follow follow1 : follow) {
            if(follow1.getFollower().equals(reminderwritermember.getId())){
                checkFollow = true;
                break;
            }
        }

       return ReminderDetailResponseDto.builder()
                .reminderWriterMemberId(reminderwritermember.getId())
                .reminderWriterImageUrl(reminderwritermember.getProfileImgPath())
                .nickname(reminderwritermember.getNickname())
                .reminderId(reminderId)
                .bookTitle(book.getTitle())
                .author(book.getAuthor())
                .content(reminder.getContent())
                .page(reminder.getPage())
                .isFollow(checkFollow)
                .build();
    }

    @Override
    public void modify(ReminderModifyRequestDto reminderModifyRequest) {

        Reminder reminder = reminderRepository.findById(reminderModifyRequest.getReminderId()).orElseThrow(() ->new RuntimeException("일치하는 리마인더가 없습니다."));
        reminder.update(reminderModifyRequest);

        reminderRepository.save(reminder);

    }

    @Override
    public void delete(ReminderDeleteRequestDto reminderDeleteRequest) {

        Reminder reminder = reminderRepository.findById(reminderDeleteRequest.getReminderId()).orElseThrow(()-> new RuntimeException("일치하는 리마인더가 없습니다."));

        reminderRepository.delete(reminder);

    }
}
