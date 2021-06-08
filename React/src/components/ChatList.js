
const ChatList = ({chatData,chatInfo,setChatInfo})=> {
    const loginID = window.sessionStorage.getItem("memberID");
    const baseUrl = "http://localhost:8080/profile/";


    const renderChatList = chatData.chat.map((data,index )=> {
        const isApplyMember = loginID===data.applyMemberID.toString(); // true : applyMember, false : openMember;
        const showMember = isApplyMember ? chatData.openMember[index] : chatData.applyMember[index];
        const title = data.chatType ? "소개팅" : "미 팅";
        let context = "";
        if(data.accept===0) {
            if (isApplyMember) {
                context = "[ 상대방의 응답을 기다리는중 입니다 ]";
            } else {
                if (data.chatType) {
                    context = "[ 소개팅 신청이 도착하였습니다 ]";
                } else {
                    context = "[ 미팅 신청이 도착하였습니다 ]";
                }
            }
        }
        return (
            <div key={data.id} className={chatInfo.chatID===data.id ? 'chatList-form-active': 'chatList-form'}
                 onClick={()=>{
                     const Data = { chatID : data.id , showMember : showMember, chatType : data.chatType ,
                         accept : data.accept, context : context , isApplyMember : isApplyMember, appeal : data.appeal};
                     setChatInfo(Data);}}>
                {data.chatType
                    ? <img className='chatList-img' alt="대표이미지" src={baseUrl+showMember.id+"/1.jpg"} width={56} height={56}/>
                    : <span className='chatList-title'>{title}</span>
                }
                <div className='chatList-sub-form'>
                    <span className='chatList-name'>{showMember.name}</span>
                    <span className='chatList-context'>{data.accept ? chatData.lastChatLog[index].msg : context}</span>
                </div>
                <span className='chatList-time'>{data.accept ? chatData.lastChatLog[index].time: "대기중"}</span>
            </div>
        );
    });

    return (
        <>
            {renderChatList}
        </>
    );
};

export default ChatList;