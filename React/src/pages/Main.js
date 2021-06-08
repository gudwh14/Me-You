import TodayMeeting from "../components/TodayMeeting";
import TodayBlind from "../components/TodayBlind";
import Footer from "../components/Footer";
import {useState,useEffect} from 'react';
import axios from "axios";
import Loading from "../components/Loading";

const Main = ()=> {
    const [meetingData, setMeetingData] = useState(null);
    const [blindData, setBlindData] = useState(null);

    useEffect(()=> {
        axios.get("http://localhost:8080/meeting/today")
            .then((response)=> {
                setMeetingData(response.data);
            })

        axios.get("http://localhost:8080/blind/today")
            .then((response)=> {
                setBlindData(response.data);
            })
    },[])

    return (
        <main>
            {
                meetingData && blindData ?
                <>
                    <TodayMeeting meetingData={meetingData}/>
                    <TodayBlind blindData={blindData}/>
                </>
                :
                <Loading/>
            }
            <Footer/>
        </main>
    );
};

export default Main;