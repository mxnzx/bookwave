package com.ssafy.bookwave.diary.repository;

import com.ssafy.bookwave.diary.domain.Diary;
import com.ssafy.bookwave.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Integer> {

    List<Diary> findByMember(Member member);

}
