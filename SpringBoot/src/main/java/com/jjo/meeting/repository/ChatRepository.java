package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Chat;

import java.util.List;
import java.util.Optional;

public interface ChatRepository {
    Chat save(Chat chat);
    Optional<Chat> findById(Long chatID);
    void deleteById(Long chatID);
    // MemberID 가 포함된 Chat List 셀렉트 해오기
    List<Chat> findByOpenMemberIDOrApplyMemberID(Long openMemberID, Long applyMemberID);
}
