package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Meeting;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SpringDataJpaMeetingRepository extends JpaRepository<Meeting, Long>, MeetingRepository {
    @Override
    Optional<Meeting> findByMemberId(Long memberId);

    @Query("select m from Meeting m order by random()")
    List<Meeting> findByRandom(Pageable pageable);
}
