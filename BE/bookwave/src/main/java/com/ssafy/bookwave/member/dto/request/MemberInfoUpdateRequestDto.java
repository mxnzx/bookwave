package com.ssafy.bookwave.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@Builder
public class MemberInfoUpdateRequestDto {

    private String nickname;
    private String stMsg;
    private MultipartFile file;
}
