package com.ssafy.bookwave.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ShowInfoRepository  {

//    @Query("select s from ShowInfo s join fetch s.member where s.showInfoId=:id")
//    Optional<ShowInfo> findByIdWithMember(Integer id);
}
