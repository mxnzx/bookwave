package com.ssafy.bookwave.record.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bookwave.book.dto.response.BookResponseDto;
import com.ssafy.bookwave.member.dto.response.MemberInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class RecordDetailResponseDto {

    private int recordWriterMemberId;
    private String recordWriterImageUrl;
    private String nickname;
    private int recordId;
    private int bookId;
    private String bookTitle;
    private String bookAuthor;
    private String bookImageUrl;
    private String recordTitle;
    private String recordImageUrl;
    private int period;
    private double score;
    private String recordContent;
    @JsonProperty("isLike")
    private boolean isLike;
    private int recordLikeCnt;
    private int recordCommentCnt;
    @JsonProperty("isFollow")
    private boolean isFollow;
    @JsonIgnore
    private LocalDateTime createdDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDateTime endDate;
    private List<CommentResponseDto> commentList;


    public String getFormattedCreatedDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return createdDate.format(formatter);
    }
}
