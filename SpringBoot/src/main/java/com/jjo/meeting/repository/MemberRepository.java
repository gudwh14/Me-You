package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByUserID(String userID);
    Optional<Member> findByName(String name);
    Optional<Member> findByUserIDAndUserPW(String userID, String userPW);
}
