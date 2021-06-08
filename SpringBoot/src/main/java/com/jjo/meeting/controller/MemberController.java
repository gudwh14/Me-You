package com.jjo.meeting.controller;


import com.jjo.meeting.domain.Member;
import com.jjo.meeting.domain.MemberProfile;
import com.jjo.meeting.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입하기
    @PostMapping("/sign")
    @ResponseBody
    public ResponseEntity<Object> signUp(@RequestBody Member member) {
        String errorMsg = memberService.validateDuplicate(member);
        if(errorMsg=="") {
            return ResponseEntity.ok()
                    .body(memberService.join(member));
        }
        else {
            return ResponseEntity.badRequest()
                    .body(errorMsg);
        }
    }

    // 로그인
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Member> login(@RequestBody Member member) {
        return ResponseEntity.ok()
                .body(memberService.Login(member));
    }


    // 소속정보 반환하기
    @PostMapping("/belong")
    public ResponseEntity<String> getBelong(@RequestParam Long memberId) {
        String belong = memberService.getBelong(memberId);

        return ResponseEntity.ok()
                .body(belong);
    }

    // 멤버 정보 한명 반환하기
    @GetMapping("/{memberID}")
    public ResponseEntity<Member> getMember(@PathVariable("memberID") Long memberID) {
        return ResponseEntity.ok()
                .body(memberService.findByMemberID(memberID));
    }


    // 프로필 정보 입력받기
    @PostMapping("/setProfile")
    public ResponseEntity<MemberProfile> setProfile(@RequestParam("memberID") Long memberID,
                                              @RequestParam("location") String location,
                                              @RequestParam("files") List<MultipartFile> files) throws  Exception{
        MemberProfile memberProfile = new MemberProfile();
        memberProfile.setMemberID(memberID);
        memberProfile.setLocation(location);
        memberProfile.setBlindOn(0);
        // 이미지 파일 업로드 후 , 경로 받아오기
        StringBuffer profile_img = memberService.setProfileImg(memberID,files);
        memberProfile.setProfile_img(profile_img.toString());
        // 멤버의 프로필 등록
        return ResponseEntity.ok()
                .body(memberService.setProfile(memberProfile));
    }

    // 프로필 정보 반환 해주기
    @GetMapping("/profile/{memberID}")
    public ResponseEntity<Object> getProfile(@PathVariable("memberID") Long memberID) {
        MemberProfile memberProfile = memberService.getProfile(memberID);
        if(memberProfile.getMemberID() != null) {
            return ResponseEntity.ok()
                    .body(memberProfile);
        }
        else {
            return ResponseEntity.ok()
                    .body(false);
        }
    }

    // 프로필 blindOn Update
    @GetMapping("/profile/updateBlind/{memberID}/{on}")
    public ResponseEntity<MemberProfile> updateBlindOn(@PathVariable("memberID") Long memberID,
                                                       @PathVariable("on") int on) {
        MemberProfile memberProfile = memberService.getProfile(memberID);
        memberProfile.setBlindOn(on);

        return ResponseEntity.ok()
                .body(memberService.setProfile(memberProfile));
    }
}
