import BlindInformComponent from "../components/BlindInformComponent";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const BlindInform = () => {

    const {blindMemberID} = useParams();
    const [blindData , setBlindData] = useState(null);

    useEffect(()=> {
        try {
            axios.get("http://localhost:8080/blind/inform/" + blindMemberID)
                .then((response) => {
                    setBlindData(response.data);
                })
        }
        catch (e) {
            console.log(e);
        }
    },[blindMemberID])

    return (
        <div className='container'>
            { blindData!==null ? <BlindInformComponent blindData={blindData}/> : <div></div>}
            <Footer/>
        </div>
    );
};

export  default  BlindInform;