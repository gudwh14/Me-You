package com.jjo.meeting.domain;

import javax.persistence.*;

@Entity
public class Chat {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private int chatType; // 0 : meeting , 1 : blind

    @Column(name = "open_member_id")
    private Long openMemberID;

    public int getAccept() {
        return accept;
    }

    public void setAccept(int accept) {
        this.accept = accept;
    }

    @Column(name = "apply_member_id")
    private Long applyMemberID;

    private int accept; // 0 : wait, 1 : accept , 2 : refuse

    private String appeal;

    public String getAppeal() {
        return appeal;
    }

    public void setAppeal(String appeal) {
        this.appeal = appeal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getChatType() {
        return chatType;
    }

    public void setChatType(int chatType) {
        this.chatType = chatType;
    }

    public Long getOpenMemberID() {
        return openMemberID;
    }

    public void setOpenMemberID(Long openMemberID) {
        this.openMemberID = openMemberID;
    }

    public Long getApplyMemberID() {
        return applyMemberID;
    }

    public void setApplyMemberID(Long applyMemberID) {
        this.applyMemberID = applyMemberID;
    }

}
