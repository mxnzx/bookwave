package com.ssafy.bookwave.member.repository;

import com.ssafy.bookwave.member.domain.MemberGenre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberGenreRepoitory extends JpaRepository<MemberGenre, Integer> {
}
