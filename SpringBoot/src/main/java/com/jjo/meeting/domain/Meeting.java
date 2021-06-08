package com.jjo.meeting.domain;



import javax.persistence.*;

@Entity
public class Meeting {

    public Meeting () {

    }
    public Meeting(Long memberId, int number, String introduction) {
        this.memberId = memberId;
        this.number = number;
        this.introduction = introduction;
    }

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long meetingId;

    private Long memberId;

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    private String imgPath;

    private int number;

    private String introduction;

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public Long getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }

    // 데이터베이스 에서는 사용되지않는 속성
    @Transient
    private String belong;

    public String getBelong() {
        return belong;
    }

    public void setBelong(String belong) {
        this.belong = belong;
    }
}
