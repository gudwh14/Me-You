# React-SpringBoot Project [ 미유미유 ]
![image](https://user-images.githubusercontent.com/37062292/121138766-fe1be500-c872-11eb-8c4d-26996f171d10.png)
- `React` `SpringBoot` 를 학습하기 위해 진행된 개인 프로젝트입니다.
- 프로젝트를 진행하면서 학습한 내용은 https://velog.io/@gudwh14/series/React-SpringBoot 에서 확인 할 수 있습니다.
<br>

# 기획

### 아이템 선정
대학생들을 대상으로 하는 N:N 미팅, 1:1 소개팅 매칭 시스템을 선택했습니다.

### 기술 스택

<div>
  <img  src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/Spring Data JPA-6DB33F?style=flat-square&logo=Spring&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=HTML5&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=CSS3&logoColor=white"</img>
  <img  src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MYSQL&logoColor=white"</img>
</div>

## 기능 설계
### 1. 회원가입
  - 사용자 정보 (ID, PW, 닉네임, 학교, 나이, 성별) 를 담아서 회원정보를 저장한다.
  
### 2. 로그인
  - 회원정보 (ID ,PW)를 사용하여 로그인

### 3. 내정보
  - 나의 회원정보를 확인 할 수 있다.
  - 소개팅 시스템을 이용하기 위한 추가 회원정보를 등록 할 수 있다. > 추가 회원 정보 : 개인 프로필 사진 , 거주지
  - 스위치 버튼을 통해 소개팅 리스트에 노출 될지 여부를 결정 할 수 있다.
  - 자신이 개설한 미팅 방 정보를 확인 할 수 있다.
  
### 3. 미팅 시스템
  - ### 미팅 개설하기 <br>
    사용자는 미팅정보를 입력하여 미팅방을 개설 할 수 있다. <br>
    미팅 정보 : 미팅 사람 수 ( 최소 2 : 2 ~ 최대 4 : 4 ), 미팅 멤버를 소개 할 수 있는 각각의 사진 , 간단한 소개글 작성

  - ### 미팅 리스트 조회 <br>
    다른 사용자들이 개설한 미팅방 목록(리스트)들을 조회 할 수 있다. <br>
    각 미팅방 목록을 클릭시 해당 미팅방 정보를 보여주는 페이지로 이동한다.
    
  - ### 미팅 신청
    간단한 소개글과 함께 신청 할 수 있다.
    
  - ### 미팅 삭제
    자신이 개설한 미팅을 삭제 할 수 있다.

### 4. 소개팅 시스템
  - ### 소개팅 노출
    내정보에 존재하는 스위치 버튼을 통해 자신을 노출 시킬수 있다.

  - ### 소개팅 리스트 조회
    소개팅 신청이 가능한 회원들의 리스트를 확인 할 수 있다.
     
  - ### 소개팅 신청
    해당 소개팅 정보 페이지에서 버튼을 통해 신청 할 수 있다.

### 5. 채팅 시스템
  - ### 미팅, 소개팅 수락 거절
    자신에게 도착한 미팅, 소개팅 신청을 수락 하거나 거절 할 수 있다. <br>
    수락 할 경우, 상대방과 채팅 할 수 있는 채팅방이 개설된다. <br>
    거절 할 경우, 신청 리스트에서 삭제한다.

  - ### 채팅방
    채팅방 정보는 미팅-소개팅 여부 , 상대방 닉네임, 소개팅일 경우 상대방 프로필 사진, 마지막 채팅 메세지 를 담고있다.

### 6. 오늘의 미팅,소개팅 소개
  - 오늘의 미팅 : 랜덤으로 미팅방 1개를 메인 페이지에서 확인 할 수 있다.
  - 오늘의 소개팅 : 랜덤으로 소개팅 3개를 메인 페이지에서 확인 할 수 있다.
    
## API 설계

### 회원 가입
   - 요청 `Method : POST` , `URL : /member/sign`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 400 Bad Request`
   

### 로그인
   - 요청 `Method : POST` , `URL : /member/login`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   

### 내정보(프로필) 조회
   - 요청 `Method : GET` , `URL : /member/{memberID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   

### 추가 프로필 등록
   - 요청 `Method : POST` , `URL : /member/setProfile`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   

### 미팅 등록
   - 요청 `Method : POST` , `URL : /meeting/create`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   

### 미팅 리스트 조회
   - 요청 `Method : GET` , `URL : /meeting/list`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   
### 미팅 정보 조회
   - 요청 `Method : GET` , `URL : /meeting/{meetingID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 400 Bad Request`
   
### 오늘의 미팅 조회
   - 요청 `Method : GET` , `URL : /meeting/today`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   
### 미팅 삭제
   - 요청 `Method : Delete` , `URL : /delete/{meetingID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   
### 소개팅 리스트 조회
   - 요청 `Method : GET` , `URL : /blind`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 400 Bad Request`
   
### 소개팅 정보 조회
   - 요청 `Method : GET` , `URL : /blind/{blindMemberID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`

### 오늘의 소개팅 조회
   - 요청 `Method : GET` , `URL : /blind/today`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   
### 미팅,소개팅 수락
   - 요청 `Method : POST` , `URL : /chat/accept`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`

### 미팅,소개팅 거절
   - 요청 `Method : POST` , `URL : /chat/reject`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`

### 채팅방 리스트 조회
   - 요청 `Method : GET` , `URL : /chat/list/{memberID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   
### 채팅(로그) 조회
   - 요청 `Method : GET` , `URL : /chat/log/{chatID}`
   - 응답 `성공 -> HTTP 200 OK` , `실패 -> HTTP 500 Internal Server Error`
   

# 보완할 점
- REST API 설계를 잘지켜서 `STATUS CODE 500` 같은 경우 반환하지 말고 서비스 에서 핸들링하여 다른 에러코드를 반환해야 한다.
- 다음 프로젝트 진행시 DB 설계, 페이지 기획을 하면 더 체계적으로 진행이 가능 해 보인다.
