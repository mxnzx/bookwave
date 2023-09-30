package com.ssafy.bookwave.diary.repository;

import com.ssafy.bookwave.diary.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {


}
