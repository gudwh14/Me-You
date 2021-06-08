import axios from "axios";
import {useEffect,useState} from 'react';

import Modal from "./Modal";
import ImageModal from "./ImageModal";
import {useHistory} from "react-router-dom";


const MeetingInformComponent = ({meeting})=>{
    const baseUrl = "http://localhost:8080/chat/save/";
    const loginMemberID = window.sessionStorage.getItem("memberID");
    const history = useHistory();
    const [memberData, setMemberData] = useState("");
    const [numberArray, setNumberArray] = useState([]);
    const [appeal , setAppeal] = useState("");
    const [modal , setModal] = useState(false);
    const [appealModal , setAppealModal] = useState(false);
    const [imgModal , setImgModal] = useState(false);
    const [imgSrc , setImgSrc] = useState("");
    const [errorMsg , setErrorMsg] = useState("");


    console.log(meeting);
    useEffect(()=> {
        const tempArray = Array(meeting.number);
        for (let index=0; index<tempArray.length; index++) {
            tempArray[index] = index+1;
        }
        setNumberArray(tempArray);
        axios.get("http://localhost:8080/member/"+meeting.memberId)
            .then((response)=>{
                setMemberData(response.data);
            })
    },[meeting]);

    const renderImg = numberArray.map((data)=> {
            const imgPath = meeting.imgPath;
            return (
                <div key={data} className='addMember-form'>
                    <span className='inform-member-span'>{data===1 ? '👑': '멤버 '+data}</span>
                    <img className='card-img' src={"http://localhost:8080/"+imgPath.split(":")[data-1]} width={150} height={150} alt='대표이미지'
                         onClick={(event) => {setImgModal(true); setImgSrc("http://localhost:8080/"+imgPath.split(":")[data-1])}}
                    />
                </div>
            )
        })

    const onClickButton = async ()=> {
        try {
            if(appeal.trim() !== "") {
                if(appeal.length > 150) {
                    setErrorMsg("150자 미만으로 작성 해 주세요.");
                    setAppealModal(true);
                }
                else {
                    const formData = new FormData();
                    formData.append("openMemberID", meeting.memberId);
                    formData.append("applyMemberID", loginMemberID);
                    formData.append("chatType", "0");
                    formData.append("appeal", appeal);
                    await axios.post(baseUrl, formData)
                        .then((response) => {
                            console.log(response.data);
                            setModal(true);
                        })
                }
            }
            else {
                setErrorMsg("미팅 신청 메세지를 작성해주세요.");
                setAppealModal(true);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const setCloseModal = ()=> {
        setModal(false);
    }

    const setCloseAppealModal = ()=> {
        setAppealModal(false);
    }

    const setCloseImgModal = () => {
        setImgModal(false);
    }

    const onClickDeleteButton = async () => {
        await axios.delete("http://localhost:8080/meeting/delete/"+meeting.meetingId)
            .then((response)=> {
                history.push("/home/meeting");
            })
    }


    return (
        <>
            <div className="meetingList-img-component">
                {renderImg}
            </div>
            <div className='create-component'>
                <div className='flex-div'>
                    <span className='meeting-sub-span'>👑</span>
                    <span className='meeting-member-name'>{memberData.name}</span>
                </div>
                <div className='flex-div'>
                    <span className='meeting-member-belong'>{memberData.belong}</span>
                    <span className='meeting-member-age'>{memberData.age+"살"}</span>
                </div>
                <span className='meetingInform-introduction'>{meeting.introduction}</span>
            </div>
            <div className="create-component">
                {
                    loginMemberID === meeting.memberId.toString()
                        ?
                        <>
                            <button onClick={onClickDeleteButton} className='delete-button'>삭제하기</button>
                        </>
                        :
                        <>
                            <div className='create-title'>
                                <span className='meeting-sub-span'>❤️</span>
                                <span className='create-main-span'> 신청하기</span>
                            </div>
                            <div className='meeting-apply-form'>
                                <textarea value={appeal} placeholder='미팅 신청 메세지 작성하기' className='create-memo'
                                          type='text'
                                          onChange={(e) => {
                                              setAppeal(e.target.value)
                                          }}/>
                                <span onClick={onClickButton} className='meeting-apply-button'>신청</span>
                            </div>
                        </>
                }

            </div>
            <Modal open={modal} closeModal={setCloseModal} header="알림">
                신청이 완료 되었습니다.<br/>
                내 정보 > 소개팅 리스트에서 확인하실 수 있습니다.
            </Modal>

            <Modal open={appealModal} closeModal={setCloseAppealModal} header="알림">
                {errorMsg}
            </Modal>

            <ImageModal open={imgModal} closeModal={setCloseImgModal} imgSrc={imgSrc}>
            </ImageModal>
        </>
    );
};

export default MeetingInformComponent;