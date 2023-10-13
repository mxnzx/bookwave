package com.ssafy.bookwave.global.util;

import com.ssafy.bookwave.global.util.property.ApplicationProperties;
import com.ssafy.bookwave.member.domain.Member;
import com.ssafy.bookwave.member.dto.FileDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;


@Component
@Slf4j
public class FileUploadUtil {

    @Value("${file.member-upload-dir}")
    private String uploadDir;

    @Value("${file.member-server-domain}")
    private String serverDomain;

    public FileDto uploadFile(MultipartFile multipartFile, Member member) {
        // 파일이 첨부되지 않은 경우
        if (multipartFile == null)
            throw new IllegalArgumentException("파일이 첨부되지 않았습니다.");

        // 확장자명이 존재하지 않을 경우 에러
        validateContentType(multipartFile);

        // 프로필 사진이 설정되어 있다면 삭제
        if(member.getProfileImgPath() != null) {
            File originalFilePath = new File(ApplicationProperties.PROFILE_PATH + member.getProfileImgPath());

            if (originalFilePath.exists()) {
                if(!originalFilePath.delete()) log.error("기존에 설정된 프로필 사진 삭제에 실패했습니다.");
            }
        }

        // 파일명 저장 경로 및 파일명 설정
        String fileName = member.getId() + "_" + multipartFile.getOriginalFilename();
        String filePath = ApplicationProperties.PROFILE_PATH  + fileName;

        // 업로드 한 파일 데이터를 지정한 파일에 저장
        File file = new File(filePath);
        FileDto fileDto = new FileDto();
        log.info("프로필 사진 저장 경로: " + filePath);
        try {
            multipartFile.transferTo(file);

            fileDto.setFilePath("https://j9b203.p.ssafy.io/img/member/" + fileName);
            fileDto.setFileOriginalName(fileName);
        } catch (Exception e) {
            throw new IllegalArgumentException("프로필 사진 변경에 실패했습니다: " + e);
        }

        return fileDto;
    }

    public String storeFile(String memberId, MultipartFile file) {
        String originalFileName = file.getOriginalFilename();
        String fileName = memberId + "_" + originalFileName;

        File directory = new File(uploadDir);
        String filePath = uploadDir + fileName;
        File destFile = new File(filePath);

        if (!directory.exists()) {
            boolean mkdirsResult = directory.mkdirs();
            if (mkdirsResult) {
                log.info("DIRECTORY_SUCCESS_MESSAGE");
            } else {
                log.info("DIRECTORY_FAIL_MESSAGE");
            }
        }
        try {
            file.transferTo(destFile);
        } catch (IOException e) {
            throw new RuntimeException("PROFILE_PICTURE_SAVE_FAIL");
        }
        log.info("PROFILE_PICTURE_SAVE_SUCCESS");
        return filePath;
    }

    private void validateContentType(MultipartFile multipartFile) {
        // 파일의 확장자 추출
        String contentType = multipartFile.getContentType();

        if(ObjectUtils.isEmpty(contentType)) {
            throw new IllegalArgumentException("사진 파일만 업로드해주세요.");
        }
        // 확장자가 jpeg, png인 파일들만 받아서 처리
        else if(!contentType.contains("image/jpeg") && !contentType.contains("image/png") && !contentType.contains("image/jpg")) {

            throw new IllegalArgumentException("사진 파일만 업로드해주세요.");
        }
    }

}
