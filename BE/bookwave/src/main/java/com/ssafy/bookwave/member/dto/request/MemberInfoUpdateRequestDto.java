package com.ssafy.bookwave.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class MemberInfoUpdateRequestDto {

    private String nickname;
    private MultipartFile file;
}
