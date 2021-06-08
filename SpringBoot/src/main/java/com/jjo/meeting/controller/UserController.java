package com.jjo.meeting.controller;


import com.jjo.meeting.domain.User;
import com.jjo.meeting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin (origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok()
                .body(userService.create(user));
    }

    @GetMapping("/read/{id}")
    public ResponseEntity<User> read(@PathVariable Long id) {
        return ResponseEntity.ok()
                .body(userService.read(id).get());
    }

    @PutMapping("/update")
    public ResponseEntity<User> read(@RequestParam Long id, @RequestParam int age) {
        return ResponseEntity.ok()
                .body(userService.update(id,age));
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}
