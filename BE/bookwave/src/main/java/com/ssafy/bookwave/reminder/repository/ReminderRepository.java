package com.ssafy.bookwave.reminder.repository;

import com.ssafy.bookwave.reminder.domain.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReminderRepository extends JpaRepository<Reminder, Integer> {


}
