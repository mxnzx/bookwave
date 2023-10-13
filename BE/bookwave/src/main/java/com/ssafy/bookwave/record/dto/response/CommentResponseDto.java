package com.ssafy.bookwave.record.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.bookwave.member.dto.response.MemberInfoResponseDto;
import com.ssafy.bookwave.record.domain.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CommentResponseDto {

    private int memberId;
    private int commentId;
    private String profileImageUrl;
    private String nickname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime registDate;
    private String content;

    public CommentResponseDto(Comment comment) {
        this.memberId = comment.getMember().getId();
        this.commentId = comment.getId();
        this.profileImageUrl = comment.getMember().getProfileImgPath(); // 여기서는 Member 엔터티 내에서 프로필 이미지 경로를 가져옵니다.
        this.nickname = comment.getMember().getNickname();
        this.registDate = comment.getCreatedDate(); // BaseTimeEntity에서 createdDate를 가져옵니다.
        this.content = comment.getContent();
    }

}
