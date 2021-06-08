import {useState} from 'react';
import ImageModal from "../components/ImageModal";
const loginID = window.sessionStorage.getItem("memberID");

const Chat = ({chatData,chatInfo,scrollRef}) => {
    const [modal ,setModal] = useState(false);
    const [imgUrl , setImgUrl] = useState("");

    const closeModal = () => {
        setModal(false);
    }


    const LastIndex = chatData.size;

    const renderChat = chatData.map((data,index)=> {
        if(loginID !== data.memberID.toString()) {
            return (
                <div key={index} className='chat-container'>
                    {
                        chatInfo.chatType
                            ?
                            <img alt="test" src={"http://localhost:8080/profile/"+chatInfo.showMember.id+"/1.jpg"} className='chat-img' width={45} height={45}
                            onClick={()=>{setModal(true); setImgUrl("http://localhost:8080/profile/"+chatInfo.showMember.id+"/1.jpg")} }/>
                            :
                            <span className='chat-title'>[미 팅]</span>
                    }
                    <div className='chat-user-container'>
                        <span className='chat-user'>{chatInfo.showMember.name}</span>
                        <div className='chat-msg-container'>
                            <span className='chat-msg'>{data.msg}</span>
                            <span className='chat-time'>{data.time}</span>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div ref={index===LastIndex ? '' : scrollRef} key={index} className='chat-myText-container'>
                    <div className='chat-myMsg-container'>
                        <span className='chat-time'>{data.time}</span>
                        <span className='chat-my-msg'>{data.msg}</span>
                    </div>
                </div>
            )
        }
    })


    return (
            <>
                { renderChat }
                <ImageModal open={modal} closeModal={closeModal} imgSrc={imgUrl}/>
            </>
    );
};

export default Chat;