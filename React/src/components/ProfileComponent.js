import {useState} from 'react';
import ImageModal from "./ImageModal";


const ProfileComponent = ({profileData}) => {
    const numArray = [1,2,3,4];
    const [modal , setModal] = useState(false);
    const [imgSrc, setImgSrc] = useState("");

    const closeModal = () => {
        setModal(false);
    }

    const renderImg = numArray.map((data)=> {
        const imgPath = profileData.blindMemberProfile.profile_img;
        return (
            <div key={data} className='addMember-form'>
                {/*<span className='inform-member-span'>사진 {data}</span>*/}
                <img className='card-img' src={"http://localhost:8080/"+imgPath.split(":")[data-1]} width={150} height={150} alt='이미지'
                onClick={ ()=> {setModal(true); setImgSrc("http://localhost:8080/"+imgPath.split(":")[data-1])} }/>
            </div>
        )
    })

    return (
        <>
            <div className="profile-img-component">
                {renderImg}
            </div>
            <div>
                <div className='profile-inform'>
                    <span className='profile-sub-span'>닉네임</span>
                    <span className='profile-main-span'>{profileData.blindMember.name}</span>
                </div>
                <div className='profile-inform'>
                    <span className='profile-sub-span'>나이</span>
                    <span className='profile-main-span'>{profileData.blindMember.age}</span>
                </div>
                <div className='profile-inform'>
                    <span className='profile-sub-span'>소속</span>
                    <span className='profile-main-span'>{profileData.blindMember.belong}</span>
                </div>
                <div className='profile-inform'>
                    <span className='profile-sub-span'>거주지</span>
                    <span className='profile-main-span'>{profileData.blindMemberProfile.location}</span>
                </div>
            </div>
            <ImageModal open={modal} closeModal={closeModal} imgSrc={imgSrc}/>
        </>
    );
};

export default ProfileComponent;