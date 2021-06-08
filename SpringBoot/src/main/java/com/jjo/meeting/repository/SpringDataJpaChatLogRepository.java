package com.jjo.meeting.repository;

import com.jjo.meeting.domain.ChatLog;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaChatLogRepository extends JpaRepository<ChatLog, Long>, ChatLogRepository{
    @Override
    List<ChatLog> findByChatID (Long ChatID);

    @Override
    List<ChatLog> findByChatID (Long chatID, Pageable pageable);
}
