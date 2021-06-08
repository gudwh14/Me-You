import {useState} from 'react';
import Footer from "../components/Footer";
import CreateMeetingForm from "../components/CreateMeetingForm";
import Modal from "../components/Modal";
import {useHistory} from "react-router-dom";

const CreateMeeting = ()=> {
    const [modal , setModal] = useState(false);
    const history = useHistory();

    const openModal =()=> {
        setModal(true);
    }

    const closeModal = ()=> {
        setModal(false);
        history.push("/home/meeting");
    }

    return (
        <div className='createMeeting-container'>
            <h1>등록하기</h1>
            <CreateMeetingForm openModal={openModal}/>
            <Modal open={modal} closeModal={closeModal} header="알림">
                미팅 등록이 완료 되었습니다.
            </Modal>
            <Footer/>
        </div>
    );
};

export default CreateMeeting;