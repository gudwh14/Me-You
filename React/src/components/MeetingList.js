import {useHistory} from "react-router-dom";

const MeetingList = ({meetingData})=>{
    const history = useHistory();


    const renderMeeting = meetingData.map((data)=> {
        const mainImgPath = data.imgPath.split(":")[0];
        const number = data.number;
        const meetingID = data.meetingId;
        return (
            <div onClick={()=>{history.push("/home/meetingInform/"+meetingID)}} key={meetingID} className='meetingList-container-man'>
                <img className='card-img' src={"http://localhost:8080/"+mainImgPath} width={120} height={120} alt='대표이미지'/>
                <div className='meetingList-main'>
                    <span className='meetingList-school'>{data.belong}</span>
                    <span className='meetingList-number'>{number} : {number}</span>
                </div>
            </div>
        )
    })

    return(
        <>
            {renderMeeting}
        </>
    );
};

export default MeetingList;