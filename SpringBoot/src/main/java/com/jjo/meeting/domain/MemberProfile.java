package com.jjo.meeting.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class MemberProfile {

    @Id
    @Column(name ="member_ID")
    private Long memberID;

    private String location;
    private String profileImg;
    private int blindOn; // 0 : off , 1 : on

    @Transient
    private int age;

    @Transient
    private String belong;

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getBelong() {
        return belong;
    }

    public void setBelong(String belong) {
        this.belong = belong;
    }

    public Long getMemberID() {
        return memberID;
    }

    public void setMemberID(Long memberID) {
        this.memberID = memberID;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getProfile_img() {
        return profileImg;
    }

    public int getBlindOn() {
        return blindOn;
    }

    public void setBlindOn(int blindOn) {
        this.blindOn = blindOn;
    }

    public void setProfile_img(String profile_img) {
        this.profileImg = profile_img;
    }

}
