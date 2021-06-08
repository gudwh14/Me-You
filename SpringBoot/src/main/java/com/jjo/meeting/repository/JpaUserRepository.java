package com.jjo.meeting.repository;

import com.jjo.meeting.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {
    @Override // Create, Update
    User save(User user);

    @Override // Read
    Optional<User> findById(Long id);

    @Override // Delete
    void deleteById(Long id);
}
