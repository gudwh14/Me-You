package com.jjo.meeting.controller;


import com.jjo.meeting.domain.Chat;
import com.jjo.meeting.domain.ChatLog;
import com.jjo.meeting.domain.Member;
import com.jjo.meeting.domain.MemberProfile;
import com.jjo.meeting.service.ChatService;
import com.jjo.meeting.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;
    private final MemberService memberService;

    @Autowired
    public ChatController(ChatService chatService, MemberService memberService) {
        this.chatService = chatService;
        this.memberService = memberService;
    }

    // 미팅 , 소개팅 신청하기
    @PostMapping("/save")
    public ResponseEntity<Object> saveChat(@RequestParam("openMemberID") Long openMemberID,
                                         @RequestParam("applyMemberID") Long applyMemberID,
                                         @RequestParam("chatType") int chatType,
                                         @RequestParam("appeal") String appeal) {
        if(chatType == 1) {
            if (memberService.getProfile(applyMemberID).getMemberID() == null) {
                return ResponseEntity.badRequest()
                        .body(false);
            }
        }
        return ResponseEntity.ok()
                .body(chatService.saveChat(chatType, openMemberID, applyMemberID, appeal));
    }

    // 미팅 , 소개팅 수락
    @PostMapping("/accept")
    public ResponseEntity<Chat> acceptChat(@RequestParam("chatID") Long chatID) {
        return ResponseEntity.ok()
                .body(chatService.acceptChat(chatID));
    }

    // 미팅 , 소개팅 거절
    @PostMapping("/reject")
    public void rejectChat(@RequestParam("chatID") Long chatID) {
        chatService.rejectChat(chatID);
    }

    // 채팅 저장하기
    @PostMapping("/log/save")
    @ResponseBody
    public ResponseEntity<ChatLog> saveChatLog(@RequestBody ChatLog chatLog) {
        return ResponseEntity.ok()
                .body(chatService.saveChatLog(chatLog));
    }

    // Chat List 반환 해주기
    @GetMapping("/list/{memberID}")
    public ResponseEntity<HashMap<String, Object>> getChatList(@PathVariable("memberID") Long memberID) {
        return ResponseEntity.ok()
                .body(chatService.getChatList(memberID));
    }

    // chatID 에 해당하는 chatLog 반환하기 ( 채팅 로그 )
    @GetMapping("/log/{chatID}")
    public ResponseEntity<List<ChatLog>> getChatLog(@PathVariable("chatID") Long chatID) {
        return ResponseEntity.ok()
                .body(chatService.getChatLog(chatID));
    }
}
