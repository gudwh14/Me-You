import Modal from "./Modal";
import {useState} from "react";
import axios from "axios";
import ProfileComponent from "./ProfileComponent";

const BlindInformComponent = ({blindData}) => {
    const baseUrl = "http://localhost:8080/chat/save/";
    const loginMemberID = window.sessionStorage.getItem("memberID");
    const [modal , setModal] = useState(false);
    const [modalMsg , setModalMsg] = useState("");


    const onClickButton = async ()=> {
        try {
            const formData = new FormData();
            formData.append("openMemberID", blindData.blindMember.id);
            formData.append("applyMemberID", loginMemberID);
            formData.append("chatType", "1");
            formData.append("appeal","");
            await axios.post(baseUrl, formData)
                .then((response) => {
                    setModalMsg("신청이 완료 되었습니다.\n내 정보 > 미팅 리스트에서 확인하실 수 있습니다.")
                    setModal(true);
                })
                .catch((error)=> {
                    if(error.response.status===400) {
                        setModalMsg("아직 본인 프로필이 등록되지 않았습니다.프로필 등록 후 신청 해 주세요.");
                        setModal(true);
                    }
                })
        }
        catch (e) {
            console.log(e);
        }
    }

    const setCloseModal = ()=> {
        setModal(false);
    }

    return (
        <div className='showProfile-container'>
            <ProfileComponent profileData={blindData}/>
            <div className='blindInform-button'>
                <button onClick={onClickButton} className='signup-button'>신청하기</button>
            </div>
            <Modal open={modal} closeModal={setCloseModal} header="알림">
                {modalMsg}
            </Modal>
        </div>
    );
};

export default BlindInformComponent;