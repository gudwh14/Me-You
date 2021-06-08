import MeetingList from "./MeetingList";
import {useHistory} from "react-router-dom";

const TodayMeeting = ({meetingData}) => {
    const history = useHistory();
    const onClickSpan = ()=> {
        history.push('/home/meeting');
    }

    console.log(meetingData);
    return (
        <div className='todayMeeting-container'>
            <span className='today-span'>오늘의 미팅</span>
            <div className="todayMeeting-box">
                <MeetingList meetingData={meetingData}/>
            </div>
            <span onClick={onClickSpan} className="today-button-red">미팅 더 보러가기</span>
        </div>
    );
};

export default TodayMeeting;