package com.jjo.meeting.service;

import com.jjo.meeting.domain.User;
import com.jjo.meeting.repository.JpaUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private JpaUserRepository jpaUserRepository;

    @Autowired
    public UserService(JpaUserRepository jpaUserRepository) {
        this.jpaUserRepository = jpaUserRepository;
    }

    public User create(User user) {
        return jpaUserRepository.save(user);
    }

    public Optional<User> read(Long id) {
        return jpaUserRepository.findById(id);
    }

    public User update(Long id,int age) {
        User user = read(id).get();
        user.setAge(age);
        return jpaUserRepository.save(user);
    }

    public void delete(Long id) {
        jpaUserRepository.deleteById(id);
    }
}
