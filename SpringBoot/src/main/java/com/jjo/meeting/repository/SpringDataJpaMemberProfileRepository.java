package com.jjo.meeting.repository;

import com.jjo.meeting.domain.MemberProfile;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpringDataJpaMemberProfileRepository extends JpaRepository<MemberProfile, Long>,  MemberProfileRepository {

    @Override
    List<MemberProfile> findByBlindOn(int blindOn);

    @Query("select m from MemberProfile m where m.blindOn = ?1 order by Random()")
    List<MemberProfile> findByRandom(int blindOn, Pageable pageable);
}
