package com.jjo.meeting.repository;

import com.jjo.meeting.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member,Long>, MemberRepository {
    @Override
    Optional<Member> findByUserIDAndUserPW(String userID, String userPW);
}
