package com.ssafy.bookwave.bbti.repository;

import com.ssafy.bookwave.bbti.domain.BbtiQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface BbtiQuesitonRepository extends JpaRepository<BbtiQuestion,Integer> {

}
