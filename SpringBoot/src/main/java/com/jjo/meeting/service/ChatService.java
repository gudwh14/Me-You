package com.jjo.meeting.service;


import com.jjo.meeting.domain.Chat;
import com.jjo.meeting.domain.ChatLog;
import com.jjo.meeting.domain.Member;
import com.jjo.meeting.repository.ChatLogRepository;
import com.jjo.meeting.repository.ChatRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final ChatLogRepository chatLogRepository;
    private final MemberService memberService;

    public ChatService(ChatRepository chatRepository, ChatLogRepository chatLogRepository, MemberService memberService) {
        this.chatRepository = chatRepository;
        this.chatLogRepository = chatLogRepository;
        this.memberService = memberService;
    }

    // Chat 신청 저장하기
    public Chat saveChat(int chatType, Long openMemberID , Long applyMemberID, String appeal) {
        Chat chat = new Chat();
        chat.setChatType(chatType);
        chat.setAccept(0);
        chat.setApplyMemberID(applyMemberID);
        chat.setOpenMemberID(openMemberID);
        chat.setAppeal(appeal);
        return chatRepository.save(chat);
    }

    // Chat 정보 반환하기
    public Chat getChat(Long chatID) {
        return chatRepository.findById(chatID)
                .orElseThrow(()-> new NoSuchElementException());
    }

    // Chat (미팅 , 소개팅) 신청 수락
    public Chat acceptChat(Long chatID) {
        Chat chat = getChat(chatID);
        chat.setAccept(1);
        return chatRepository.save(chat);
    }
    // Chat (미팅 , 소개팅) 신청 거절
    public void rejectChat(Long chatID) {
        chatRepository.deleteById(chatID);
    }

    // Chat 리스트 반환 ( accept -> 0 : wait, 1 : accept , 2 : refuse)
    public HashMap<String,Object> getChatList(Long memberID) {
        HashMap<String,Object> hashMap = new HashMap<>();
        List<Member> applyMemberList = new ArrayList<>();
        List<Member> openMemberList = new ArrayList<>();
        List<ChatLog> lastChatLog = new ArrayList<>();
        List<Chat> chatList = chatRepository.findByOpenMemberIDOrApplyMemberID(memberID,memberID);
        chatList
                .stream()
                .map((list) -> applyMemberList.add(memberService.findByMemberID(list.getApplyMemberID())))
                .collect(Collectors.toList());
        chatList
                .stream()
                .map((list) -> openMemberList.add(memberService.findByMemberID(list.getOpenMemberID())))
                .collect(Collectors.toList());
        chatList
                .stream()
                .map((list) -> lastChatLog.add(getLastChatLog(list.getId())))
                .collect(Collectors.toList());
        hashMap.put("chat",chatList);
        hashMap.put("applyMember",applyMemberList);
        hashMap.put("openMember",openMemberList);
        hashMap.put("lastChatLog",lastChatLog);
        return hashMap;
    }

    // 채팅 저장하기
    public ChatLog saveChatLog (ChatLog chatLog) {
        return chatLogRepository.save(chatLog);
    }

    // chat_log 반환하기
    public List<ChatLog> getChatLog (Long chatID) {
        return chatLogRepository.findByChatID(chatID);
    }

    // Last chat_log 반환하기
    public ChatLog getLastChatLog (Long chatID) {
        Pageable pageable = PageRequest.of(0,1, Sort.Direction.DESC,"id");
        List<ChatLog> chatLogList = chatLogRepository.findByChatID(chatID, pageable);
        if(chatLogList.isEmpty()) {
            return new ChatLog();
        }
        else {
            return chatLogList.get(0);
        }
    }
}
