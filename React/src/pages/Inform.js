import Footer from "../components/Footer";
import InFormProfile from "../components/InFormProfile";
import {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Modal from "../components/Modal";

const Inform = ()=> {
    const history = useHistory();
    const memberID = window.sessionStorage.getItem("memberID");

    const [profileData , setProfileData] = useState(null);
    const [memberData , setMemberData] = useState(null);
    const [modal , setModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");

    const onClickProfileSet = ()=> {
        history.push("setProfile");
    }

    useEffect(()=> {
        axios.get("http://localhost:8080/member/profile/"+ memberID)
            .then((response)=> {
                if (response.data === false) {
                    setProfileData(null);
                }
                else {
                    setProfileData(response.data);

                }
                console.log(response.data);
            })
        axios.get("http://localhost:8080/member/" + memberID)
            .then((response)=> {
                setMemberData(response.data);
            })
    },[memberID]);

    const onClickMyMeetingButton = async () => {
        await axios.get("http://localhost:8080/meeting/member/" + memberID)
            .then((response)=> {
                history.push("/home/meetingInform/"+response.data.meetingId);
            })
            .catch((error)=> {
                if(error.response.status===400) {
                    setModalMsg("개설한 미팅이 존재하지 않습니다.");
                    setModal(true);
                }
            })
    }

    const onClickBlindDateButton = () => {
        history.push("/home/blind");
    }

    const closeModal = ()=> {
        setModal(false);
    }

    return (
      <div className='inform-container'>
          {
              memberData
              ?
              <>
                  {
                      (profileData!==null && memberData!==null) ? <InFormProfile profileData={profileData} memberData={memberData}/> :
                          <div onClick={onClickProfileSet} className='profile-set'>
                              <span className='profile-set-main'>프로필 설정하기</span>
                              <span className='profile-set-sub'>아직 프로필이 등록되지 않았습니다.</span>
                          </div>
                  }
                  <div className='inform-list'>
                      <button className='inform-list-pink' onClick={onClickMyMeetingButton}>내 미팅 보러가기</button>
                      <button className='inform-list-blue' onClick={onClickBlindDateButton}>소개팅 보러가기</button>
                  </div>
              </>
              :
              <Loading/>
          }
          <Modal open={modal} closeModal={closeModal} header="알람">{modalMsg}</Modal>
          <Footer/>
      </div>
    );
};

export default Inform;