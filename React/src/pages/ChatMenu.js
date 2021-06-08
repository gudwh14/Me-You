import {useEffect, useState, useRef} from 'react';
import axios from "axios";
import ChatList from "../components/ChatList";
import Chat from "./Chat";
import SockJsClient from 'react-stomp';
import Category from "../components/Category";
import Loading from "../components/Loading";
import {useHistory} from "react-router-dom";


const ChatMenu = () => {
    const $websocket = useRef(null);
    const chatUrl = "http://localhost:8080/chat/";
    const imgUrl = "http://localhost:8080/profile/";
    const history = useHistory();

    const loginID = window.sessionStorage.getItem("memberID");
    const [chatListData , setChatListData] = useState(null);
    const [category , setCategory] = useState('all');
    const [chatData, setChatData] = useState([]);
    const [chatInfo, setChatInfo] = useState({chatID : null});
    const [msg , setMsg] = useState("");

    const scrollRef = useRef();
    // 채팅 리스트 불러오는 함수
    const loadChatList = async () => {
        await axios.get(chatUrl+"list/"+ loginID)
            .then((response)=> {
                setChatListData(response.data);
            })
    }

    // chatData 가 변할때마다 -> 채팅을 보내거나 전달 받으면 업데이트 해준다
    useEffect(()=> {
       loadChatList();
    },[chatData])

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({block : 'end', behavior : 'auto', inline : 'nearest'});
        console.log(scrollRef);
    }
    // 채팅 리스트 의 채팅방을 선택하여 chatInfo 가 변경하면 해당 채팅방의 채팅로그를 불러온다
    useEffect(()=> {
        try {
            if(chatInfo.chatID) {
                axios.get(chatUrl+"log/" + chatInfo.chatID)
                    .then((response) => {
                        setChatData(response.data);
                    })
            }
        }
        catch (e) {
            console.log(e);
        }
    },[chatInfo]);

    const onClickSendButton = async (event) => {
        try {
            event.preventDefault();
            if(msg.trim() !=="") {
                const date = new Date();
                const Data = {
                    chatID: chatInfo.chatID,
                    memberID: loginID,
                    msg: msg,
                    day : date.toLocaleDateString(),
                    time : date.toLocaleTimeString([],{hour : 'numeric', minute: '2-digit'})
                }
                await $websocket.current.sendMessage('/sendMsg/test', JSON.stringify(Data));
                await axios.post(chatUrl+"log/save", Data)
                    .then((response) => {
                        setMsg("");
                    })
            }
        }
        catch (e) {

        }
    }

    const addChatData = (data) => {
        const tempArray = [...chatData];
        tempArray.push(data);
        setChatData(tempArray);
    }

    const onClickAccept = async () => {
        const formData = new FormData();
        formData.append("chatID",chatInfo.chatID);
        await axios.post(chatUrl + "accept",formData)
            .then((response)=> {
                loadChatList();
                setChatInfo({chatID : null});
            });
    }

    const onClickReject = async () => {
        const formData = new FormData();
        formData.append("chatID",chatInfo.chatID);
        await axios.post(chatUrl + "reject",formData)
            .then((response)=> {
                loadChatList();
                setChatInfo({chatID : null});
            });
    }


    return (
        <div className='container'>
            {
                chatListData
                    ?
                    <>
                        <div className='chatList-container'>
                            <div className='chatList-left'>
                                <span className='chatList-list-span'>대화방 리스트</span>
                                <div className='chatList-msgList'>
                                    <Category setCategory={setCategory}/>
                                    {chatListData ? <ChatList
                                        chatData={chatListData}
                                        chatInfo={chatInfo}
                                        setChatInfo={setChatInfo}/> : <div></div>}
                                </div>
                            </div>
                            <div className='chatList-right'>
                                {chatInfo.chatID === null
                                    ?
                                    <div className='chatMenu-span'>
                                        <span className='chatMenu-emptyTitle'>미유미유</span>
                                        <span className='chatMenu-emptySub'>대화를 시작 해 보세요</span>
                                    </div>
                                    :
                                    <>
                                        <div className='chatList-chat-title'>
                                            {chatInfo.chatType ?
                                                <img
                                                    src={imgUrl+chatInfo.showMember.id+"/1.jpg"}
                                                    alt='title'
                                                    width={35} height={35}
                                                    className='chatList-img'
                                                />
                                                : <span className='chatList-chat-type'>{chatInfo.showMember ? chatInfo.showMember.belong : ""}</span>}
                                            <span className='chatList-user'>{chatInfo.showMember ? chatInfo.showMember.name : ""}</span>
                                            <span className='chatList-exit'></span>
                                        </div>
                                        { chatInfo.accept ?
                                            <div className='chatList-chat-container'>
                                                <div className='chatList-chat'>
                                                    {chatData ? <Chat chatData={chatData} chatInfo={chatInfo} scrollRef={scrollRef}/> : <div></div>}
                                                </div>
                                                <div className='chatList-chat-send'>
                                                    <form className='chatList-chat-form' onSubmit={onClickSendButton}>
                                                        <input onChange={(e) => {
                                                            setMsg(e.target.value)
                                                        }} value={msg} className='chat-input' type='text'
                                                               placeholder="메세지를 입력해주세요"/>
                                                        <button type="submit" onClick={onClickSendButton}
                                                                className='chat-send-button'>보내기
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                            :
                                            <div className='chatList-accept-container'>
                                                <span className='chatList-accept-title'>{chatInfo.context}</span>
                                                {chatInfo.isApplyMember ? <span>거절 될 경우 대화방 리스트에서 자동으로 사라집니다</span>
                                                    :
                                                    <div className='chatList-accept-info'>
                                                        {chatInfo.chatType ?
                                                            <img
                                                                alt="이미지"
                                                                src={imgUrl + chatInfo.showMember.id + "/1.jpg"}
                                                                width={120} height={120}
                                                                className='chat-img'
                                                                onClick={()=> {history.push("/home/profile/"+chatInfo.showMember.id)} }
                                                            />
                                                            :
                                                            <div className='accept-meeting'>
                                                                <span className='accept-belong'>{chatInfo.showMember.belong}</span>
                                                                <span className='accept-appeal'>{chatInfo.appeal}</span>
                                                            </div>
                                                        }
                                                        <div className='accept-info-span'>
                                                            <span onClick={onClickAccept} className='accept-span'>수락</span>
                                                            <span onClick={onClickReject} className='reject-span'>거절</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    </>
                    :
                    <Loading/>
            }
            <SockJsClient
                url={"http://localhost:8080/webSocket"}
                topics={["/topic/"+chatInfo.chatID, "/topic/"+loginID]}
                onMessage={(msg)=> {
                    addChatData(msg);
                    scrollToBottom();
                }}
                ref={$websocket}
            />
        </div>
    );
};


export default ChatMenu;
