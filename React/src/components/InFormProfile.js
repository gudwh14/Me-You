import Modal from "./Modal";
import {useState,useEffect} from 'react';
import axios from "axios";

const InFormProfile = ({profileData,memberData})=> {
    const [modal, setModal ]  = useState(false);
    const [blindOn , setBlindOn] = useState(0);
    const memberID = window.sessionStorage.getItem("memberID");
    const url = "http://localhost:8080/member/profile/updateBlind/";

    useEffect(()=> {
        setBlindOn(profileData.blindOn);
    },[profileData]);

    const onClickSwitch = async () => {
        try {
            const setBlind = blindOn ? 0 : 1
            await axios.get(url + memberID + "/" + setBlind)
                .then((response) => {
                    setModal(true);
                })
        } catch (e) {
            console.log(e);
        }
        blindOn ? setBlindOn(0) : setBlindOn(1);
    }
    const onClickModal = ()=> {
        setModal(false);
    }

    return (
        <div className='inform-profile'>
            <div className='profile-inform'>
                <span className='profile-sub-span'>닉네임</span>
                <span className='profile-main-span'>{memberData.name}</span>
            </div>
            <img className='card-img' src={"http://localhost:8080/"+profileData.profile_img.split(":")[0]} alt='프로필이미지' width={150} height={150}/>
            <div className='cardList-top'>
                <span>{memberData.belong}</span>
                <span>{memberData.age+"살"}</span>
            </div>
            <span className='cardList-address'>{profileData.location}</span>
            <div className='cardList-switch'>
                <span>소개팅</span>
                <label className='switch' >
                    <input type='checkbox' onChange={onClickSwitch} checked={blindOn}/>
                    <span className='slider-round'></span>
                </label>
            </div>
            <Modal open={modal} closeModal={onClickModal} header="알림">{blindOn ? "소개팅 리스트에 노출 됩니다." : "앞으로 소개팅 리스트에 노출되지 않습니다."}</Modal>
        </div>
    );
};

export default InFormProfile;