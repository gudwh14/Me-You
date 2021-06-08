package com.jjo.meeting.service;

import com.jjo.meeting.domain.Meeting;
import com.jjo.meeting.handler.FileHandler;
import com.jjo.meeting.repository.MeetingRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class MeetingService {
    private FileHandler fileHandler;
    private MeetingRepository meetingRepository;
    private MemberService memberService;

    // meetingService 에서 memberService , FIleHandler 사용
    public MeetingService(MeetingRepository meetingRepository, MemberService memberService) {
        this.meetingRepository = meetingRepository;
        this.fileHandler = new FileHandler();
        this.memberService = memberService;
    }

    // 미팅 멤버들의 사진을 저장하고 저장된 사진 주소를 반환한다.
    public StringBuffer saveImage(Long meetingId,  List<MultipartFile> files) throws Exception{
        return fileHandler.saveFile(meetingId, files);
    }

    // 미팅리스트를 저장하고 해당 미팅 ID 를 반환한다.
    public Long create(Meeting meeting) {
        meetingRepository.save(meeting);
        return meeting.getMeetingId();
    }

    // meetingID로 미팅 한개 반환
    public Meeting findOneByMeetingId(Long meetingId) {
        return meetingRepository.findById(meetingId)
                .orElseGet(()->new Meeting());
    }

    // memberID로 미팅 한개 반환
    public Meeting findOneByMemberId(Long memberID) {
        return meetingRepository.findByMemberId(memberID)
                .orElseGet(()->new Meeting());
    }

    // 미팅 객체에 belong 속성을 set 해준다.
    public Meeting addBelong(Meeting meeting) {
        String belong = memberService.getBelong(meeting.getMemberId());
        meeting.setBelong(belong);
        return meeting;
    }


    // findAll() 한 List<Meeting>을 1:1 매핑시켜 belong 속성을 set 한 미팅 객채로 반환해준다.
    public List<Meeting> findAll() {
        List<Meeting> meeting = meetingRepository.findAll();
        meeting.stream()
                .map((list) -> addBelong(list))
                .collect(Collectors.toList());
        return meeting;
    }

    // 해당 유저의 미팅 보유 여부를 반환해준다.
    public boolean isCreate(Long memberID) {
        return meetingRepository.findByMemberId(memberID)
                .isPresent();
    }

    // 랜덤으로 오늘의 미팅 리스트를 반환해준다.
    public List<Meeting> todayMeeting() {
        // Paging 처리 , 1개 아이템만 가져오기
        Pageable pageable = PageRequest.of(0,1);
        // MeetingList 가져와서 belong(소속) 추가 해서 반환해주기
        List<Meeting> meetingList = meetingRepository.findByRandom(pageable).stream()
                .map((list) -> addBelong(list))
                .collect(Collectors.toList());

        return meetingList;
    }

    // 미팅 삭제 By meetingID
    public void deleteByMeetingID(Long meetingID) {
        meetingRepository.deleteById(meetingID);
    }

}
