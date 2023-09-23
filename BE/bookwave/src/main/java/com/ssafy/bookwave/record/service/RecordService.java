package com.ssafy.bookwave.record.service;

import com.ssafy.bookwave.record.dto.request.RecordBookshelfResponseDto;

public interface RecordService {

    RecordBookshelfResponseDto getBookshelf(int memberId);
}
