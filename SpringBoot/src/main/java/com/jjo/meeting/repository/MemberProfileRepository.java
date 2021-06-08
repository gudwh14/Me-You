package com.jjo.meeting.repository;

import com.jjo.meeting.domain.MemberProfile;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface MemberProfileRepository {
    MemberProfile save(MemberProfile memberProfile);
    Optional<MemberProfile> findById(Long memberID);
    List<MemberProfile> findByBlindOn(int blindOn);
    List<MemberProfile> findByRandom(int blindOn, Pageable pageable);
}
