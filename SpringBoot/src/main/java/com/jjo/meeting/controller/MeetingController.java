package com.jjo.meeting.controller;


import com.jjo.meeting.domain.Meeting;
import com.jjo.meeting.service.MeetingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/meeting")
public class MeetingController {
    private final MeetingService meetingService;

    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    // 미팅 리스트 생성하기
    @PostMapping("/create")
    public ResponseEntity<?> createMeeting(@RequestParam("number") String number,
                       @RequestParam("memberId") String memberId,
                       @RequestParam("introduction") String introduction,
                       @RequestParam("files") List<MultipartFile> files) throws  Exception {
        // Meeting 객채 생성하여 미팅 아이디 반환
        Meeting meeting = new Meeting(Long.parseLong(memberId), Integer.parseInt(number), introduction);
        Long meetingId = meetingService.create(meeting);
        // 반환된 미팅 ID로 이미지 업로드 폴더 만들어 파일 업로드 후 , meeting Update 해주기
        StringBuffer imgList = meetingService.saveImage(meetingId, files);
        meeting.setImgPath(imgList.toString());
        meetingService.create(meeting);

        return ResponseEntity.ok().build();
    }

    // 미팅 삭제하기
    @DeleteMapping("/delete/{meetingID}")
    public void deleteMeeting(@PathVariable("meetingID") Long meetingID) {
        meetingService.deleteByMeetingID(meetingID);
    }

    // 미팅 리스트 반환하기
    @GetMapping("/list")
    public ResponseEntity<List<Meeting>> getMeetingList() {
        return ResponseEntity.ok()
                .body(meetingService.findAll());
    }

    // 해당(미팅 ID)로 미팅 한개 반환하기
    @GetMapping("/{meetingID}")
    public ResponseEntity<Object> getMeeting(@PathVariable("meetingID") Long meetingID) {
        Meeting meeting = meetingService.findOneByMeetingId(meetingID);
        if(meeting.getMeetingId()==null) {
            return ResponseEntity.badRequest()
                    .body("해당유저의 미팅 리스트를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok()
                .body(meeting);
    }

    // 해당(멤버 ID) 미팅 한개 반환하기
    @GetMapping("/member/{memberID}")
    public ResponseEntity<Object> findOneByMemberID(@PathVariable("memberID") Long memberID) {
        Meeting meeting = meetingService.findOneByMemberId(memberID);
        if(meeting.getMeetingId()==null) {
            return ResponseEntity.badRequest()
                    .body("해당유저의 미팅 리스트를 찾을 수 없습니다.");
        }
        return ResponseEntity.ok()
                .body(meeting);
    }

    // 해당 유저가 만든 미팅이 존재하는지 반환
    @GetMapping("/isCreate/{memberID}")
    public ResponseEntity<Boolean> isCreate(@PathVariable("memberID") Long memberID) {
        return ResponseEntity.ok()
                .body(meetingService.isCreate(memberID));
    }

    // Today 미팅 반환하기
    @GetMapping("/today")
    public ResponseEntity<List<Meeting>> todayMeeting() {
        return ResponseEntity.ok()
                .body(meetingService.todayMeeting());
    }

}
