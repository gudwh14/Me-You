package com.jjo.meeting.service;

import com.jjo.meeting.domain.Member;
import com.jjo.meeting.domain.MemberProfile;
import com.jjo.meeting.handler.FileHandler;
import com.jjo.meeting.repository.MemberProfileRepository;
import com.jjo.meeting.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class MemberService {
    private FileHandler fileHandler;
    private MemberRepository memberRepository;
    private MemberProfileRepository memberProfileRepository;

    //DI 해주기
    @Autowired
    public MemberService(MemberRepository memberRepository,
                         MemberProfileRepository memberProfileRepository) {
        this.fileHandler = new FileHandler();
        this.memberRepository = memberRepository;
        this.memberProfileRepository = memberProfileRepository;
    }

    // 회원가입
    public Member join(Member member) {
        memberRepository.save(member);
        return member;
    }

    // 회원가입시 중복 확인
    public String validateDuplicate(Member member) {
        String errorMsg = "";
        if (memberRepository.findByUserID(member.getUserID()).isPresent()) {
            errorMsg = "이미 존재하는 아이디 입니다.";
        }
        else if(memberRepository.findByName(member.getName()).isPresent()) {
            errorMsg = "이미 존재하는 닉네임 입니다.";
        }
        return errorMsg;
    }

    // 로그인
    public Member Login(Member member) {
        return memberRepository.findByUserIDAndUserPW(member.getUserID(), member.getUserPW())
                .orElseThrow(()-> new NoSuchElementException());
    }

    public Member findByMemberID(Long memberID) {
        return memberRepository.findById(memberID)
                .orElseThrow(()-> new NoSuchElementException());
    }

    // memberId 를 참조해서 해당 멤버의 소속된 대학교,회사명을 반환함
    public String getBelong(Long memberId) {
        System.out.println(memberId);
        return memberRepository.findById(memberId).get().getBelong();
    }

    // profile 이미지 파일 업로드 후 파일 업로드 경로를 반환함
    public StringBuffer setProfileImg (Long memberID , List<MultipartFile> files) throws Exception {
        return fileHandler.saveProfileImgFile(memberID,files);
    }

    // Member 의 Profile 를 등록함
    public MemberProfile setProfile (MemberProfile memberProfile) {
        return memberProfileRepository.save(memberProfile);
    }

    // Member 의 Profile 를 반환해준다.
    public MemberProfile getProfile (Long memberID) {
        return memberProfileRepository.findById(memberID)
                .orElse(new MemberProfile());
    }

    // MemberProfile 에 Member 의 belong, age 속성을 추가한 MemberProfile 를 반환해준다.
    public MemberProfile setMemberOption(MemberProfile memberProfile) {
        Long memberID = memberProfile.getMemberID();
        Member member = memberRepository.findById(memberID)
                .orElseThrow(()-> new NoSuchElementException());

        memberProfile.setBelong(member.getBelong());
        memberProfile.setAge(member.getAge());

        return memberProfile;
    }

    // BlindOn = 1 인 Member 를 반환 해준다
    public List<MemberProfile> getBlindList () {
        Pageable pageable = PageRequest.of(0,20);

        List<MemberProfile> memberProfiles = memberProfileRepository.findByRandom(1,pageable);
        memberProfiles.stream().map((list)-> setMemberOption(list))
                .collect(Collectors.toList());

        return memberProfiles;
    }

    // Today MemberProfile ( BlindList ) 리스트를 반환해준다
    public List<MemberProfile> todayBlind() {
        // paging 처리
        Pageable pageable = PageRequest.of(0,3);

        List<MemberProfile> memberProfileList = memberProfileRepository.findByRandom(1,pageable)
                .stream().map((list)-> setMemberOption(list))
                .collect(Collectors.toList());

        return memberProfileList;
    }
}
