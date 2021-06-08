package com.jjo.meeting.controller;

import com.jjo.meeting.domain.Member;
import com.jjo.meeting.domain.MemberProfile;
import com.jjo.meeting.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/blind")
public class BlindController {
    private final MemberService memberService;

    public BlindController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 소개팅 리스트 반환해주기
    @GetMapping
    public ResponseEntity<List<MemberProfile>> getBlindList() {
        return ResponseEntity.ok()
                .body(memberService.getBlindList());
    }

    // 소개팅 InForm 반환 해주기
    @GetMapping("/inform/{blindMemberID}")
    public ResponseEntity<HashMap<String,Object>> getBlindInForm (@PathVariable Long blindMemberID) {
        HashMap<String ,Object> blindInform = new HashMap<>();
        Member blindMember = memberService.findByMemberID(blindMemberID);
        MemberProfile blindMemberProfile = memberService.getProfile(blindMemberID);

        blindInform.put("blindMember", blindMember);
        blindInform.put("blindMemberProfile", blindMemberProfile);

        return ResponseEntity.ok()
                .body(blindInform);
    }

    // 오늘의 소개팅 리스트 반환해주기
    @GetMapping("/today")
    public ResponseEntity<List<MemberProfile>> todayBlind() {
        return ResponseEntity.ok()
                .body(memberService.todayBlind());
    }
}
