package com.jjo.meeting.controller;


import com.jjo.meeting.domain.ChatLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebSocketController {

    // 메세징 템플릿 사용해보기
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @MessageMapping("/sendMsg")
    @SendTo("/topic/chatID")
    public ChatLog SendToMessage(ChatLog chatLog) {
        return chatLog;
    }

    @MessageMapping("/sendMsg/test")
    public void SendToMsg(ChatLog chatLog) {
        messagingTemplate.convertAndSend("/topic/" + chatLog.getChatID(), chatLog);
    }

}
