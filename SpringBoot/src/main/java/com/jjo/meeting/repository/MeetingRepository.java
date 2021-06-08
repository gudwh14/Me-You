package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Meeting;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository {
    Meeting save(Meeting meeting);
    Optional<Meeting> findById(Long meetingId);
    Optional<Meeting> findByMemberId(Long memberId);
    List<Meeting> findAll();
    List<Meeting> findByRandom(Pageable pageable);
    void deleteById(Long meetingId);
}
