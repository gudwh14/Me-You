package com.jjo.meeting;

import com.jjo.meeting.handler.FileHandler;
import com.jjo.meeting.repository.*;
import com.jjo.meeting.service.ChatService;
import com.jjo.meeting.service.MeetingService;
import com.jjo.meeting.service.MemberService;
import com.jjo.meeting.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

public class SpringConfig {
    private final MemberRepository memberRepository;
    private final MeetingRepository meetingRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final ChatRepository chatRepository;
    private final ChatLogRepository chatLogRepository;
    private final JpaUserRepository jpaUserRepository;

    //DI 해주기 외부에서 memberRepository 넣어주기
    @Autowired
    public SpringConfig(MemberRepository memberRepository,
                        MeetingRepository meetingRepository,
                        MemberProfileRepository memberProfileRepository,
                        ChatRepository chatRepository,
                        ChatLogRepository chatLogRepository,
                        JpaUserRepository jpaUserRepository) {
        this.memberRepository = memberRepository;
        this.meetingRepository = meetingRepository;
        this.memberProfileRepository = memberProfileRepository;
        this.chatRepository = chatRepository;
        this.chatLogRepository = chatLogRepository;
        this.jpaUserRepository = jpaUserRepository;
    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository,memberProfileRepository);
    }

    // meetingService 에서 memberService 를 이용함
    @Bean
    public MeetingService meetingService() {
        return new MeetingService(meetingRepository,memberService());
    }

    @Bean
    public ChatService chatService() {
        return new ChatService(chatRepository,chatLogRepository, memberService());
    }

    @Bean
    public UserService userService() {
        return new UserService(jpaUserRepository);
    }
}
