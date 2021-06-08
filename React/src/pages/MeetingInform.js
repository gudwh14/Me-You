import Footer from "../components/Footer";
import MeetingInformComponent from "../components/MeetingInformComponent";
import {useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from "axios";

const MeetingInform = ()=> {

    const {meetingID} = useParams();
    const [meetingData , setMeetingData] = useState(null);

    useEffect(()=> {
        try {
            axios.get("http://localhost:8080/meeting/" + meetingID)
                .then((response) => {
                    setMeetingData(response.data);
                })
        }
        catch (e) {
            console.log(e);
        }
    },[meetingID])

    return (
        <div className="meetingInform-container">
            {meetingData!==null ? <MeetingInformComponent meeting={meetingData}/> : <div></div>}
            <Footer/>
        </div>
    );
};

export default MeetingInform;