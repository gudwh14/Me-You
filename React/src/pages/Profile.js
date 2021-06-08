import ProfileComponent from "../components/ProfileComponent";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const Profile = () => {

    const {profileMemberID} = useParams();
    const [profileMemberData , setProfileMemberData] = useState(null);

    useEffect(()=> {
        try {
            axios.get("http://localhost:8080/blind/inform/" + profileMemberID)
                .then((response) => {
                    setProfileMemberData(response.data);
                })
        }
        catch (e) {
            console.log(e);
        }
    },[profileMemberID])

    return (
        <div className='container'>
            <div className='showProfile-container'>
                { profileMemberData ? <ProfileComponent profileData={profileMemberData}/> : <></>}
            </div>
        </div>
    );
}

export default Profile;