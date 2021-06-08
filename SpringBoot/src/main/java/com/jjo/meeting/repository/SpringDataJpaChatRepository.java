package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SpringDataJpaChatRepository extends JpaRepository<Chat, Long> ,ChatRepository{
    @Override
    List<Chat> findByOpenMemberIDOrApplyMemberID(Long openMemberID, Long applyMemberID);
}
