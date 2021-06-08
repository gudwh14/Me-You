package com.jjo.meeting.repository;

import com.jjo.meeting.domain.ChatLog;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ChatLogRepository {
    ChatLog save(ChatLog chatLog);
    List<ChatLog> findByChatID (Long chatID);
    List<ChatLog> findByChatID (Long chatID, Pageable pageable);
}
