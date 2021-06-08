import CardList from "./CardList";
import {useHistory} from "react-router-dom";

const TodayBlind = ({blindData})=> {
    const history = useHistory();
    const onClickSpan = ()=> {
        history.push('/home/blind');
    }

    return(
        <div className='todayBlind-container'>
            <span className='today-span'>오늘의 소개</span>
            <div className="todayMeeting-box">
                <CardList blindData={blindData} today={true}/>
            </div>
            <span onClick={onClickSpan} className="today-button-blue">소개팅 더 보러가기</span>
        </div>
    );
};

export default TodayBlind;