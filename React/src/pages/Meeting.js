import MeetingList from "../components/MeetingList";
import {useState, useEffect} from 'react';
import Footer from "../components/Footer";
import axios from "axios";
import {useHistory} from "react-router-dom";
import Modal from "../components/Modal";
import Loading from "../components/Loading";

const Meeting = ()=> {
    const [meetingData, setMeetingData] = useState(null);
    const [modal, setModal] = useState(false);
    const history = useHistory();
    const memberID = window.sessionStorage.getItem("memberID");

    useEffect(()=> {
        window.scrollTo(0,0);
    },[])

    useEffect(()=> {
        axios.get("http://localhost:8080/meeting/list")
            .then((response)=> {
                setMeetingData(response.data);
            })
    },[])

    const closeModal = () => {
        setModal(false);
    }

    const onClickAddMeeting = async () =>{
        await axios.get("http://localhost:8080/meeting/isCreate/"+memberID)
            .then((response)=>{
                if(response.data===false) {
                    history.push("/home/createMeeting");
                }
                else {
                    setModal(true);
                }
            })
    }

    return (
        <div className='meeting-container'>
            {
                meetingData
                    ?
                    <>
                        <div className='meeting-menu'>
                            <span onClick={onClickAddMeeting} className='meeting-add'>❤️ 등록하기</span>
                        </div>
                        <MeetingList meetingData={meetingData}/>
                    </>
                    :
                    <Loading/>
            }
            <Modal open={modal} closeModal={closeModal} header="알림">
                이미 등록된 미팅이 존재합니다.
            </Modal>
            <Footer/>
        </div>
    );
};

export default Meeting;

