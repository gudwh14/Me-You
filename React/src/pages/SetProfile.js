import Footer from "../components/Footer";
import {useState} from 'react';
import axios from "axios";
import Location from "../Location";
import Modal from "../components/Modal";
import {useHistory} from "react-router-dom";

const SetProfile = ()=> {
    // 위치 JSON Index;
    const locationIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    const locationJson = Location;
    // history 관리
    const history = useHistory();
    // img 관련 변수들
    // 이미지 파일
    const [imgFile, setImgFile] = useState([]);
    // 이미지 등록 여부
    const [change, setChange] = useState([false,false,false,false]);

    // 미리보기 이미지 경로 0 : main , (1,2,3) : sub
    const [fileUrl, setFileUrl] = useState([null,null,null,null]);
    //
    const [location, setLocation] = useState(null);
    //
    const [locationTemp, setLocationTemp] = useState(0);
    // Modal 관리 변수
    const [modal,setModal] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    // 이미지 파일 등록 메소드
    const onChangeImage = (event,num)=> {

        const tempImgFile = [...imgFile];
        tempImgFile.splice(num,1,event.target.files[0]);
        setImgFile(tempImgFile);
        const imgUrl = URL.createObjectURL(event.target.files[0]);

        const tempUrl = [...fileUrl];
        tempUrl.splice(num,1,imgUrl);
        setFileUrl(tempUrl);

        const tempChange = [...change];
        tempChange.splice(num,1,true);
        setChange(tempChange);
    }

    // 등록버튼 리스너
    const onClickButton = async () => {
        try {
            if(change[0] && change[1] && change[2] && change[3]) {
                if(location) {
                    const formData = new FormData();
                    for (let i = 0; i < imgFile.length; i++) {
                        formData.append('files', imgFile[i]);
                    }
                    formData.append("memberID", window.sessionStorage.getItem("memberID"));
                    formData.append("location", String(location));
                    await axios.post("http://localhost:8080/member/setProfile", formData)
                        .then((response) => {
                            history.push("/home/inform");
                        })
                }
                else {
                    setModalMsg("거주지를 선택해 주세요.");
                    setModal(true);
                    // location
                }
            }
            else {
                setModalMsg("대표 사진 및 매력사진을 등록 해 주새요.");
                setModal(true);
                // file
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const closeModal = () => {
        setModal(false);
    }
    const renderSelect = locationIndex.map((data)=> {
        return (
            <option key={data} value={data}>
                {Object.getOwnPropertyNames(locationJson[data])[0]}
            </option>
        )
    });

    const renderLocation = locationJson[locationTemp][Object.getOwnPropertyNames(locationJson[locationTemp])[0]].map((data)=> {
        return (
                <option key={data} value={data}>{data}</option>
        )
    });

    return (
        <div className='container'>
            <div className='profile-component'>
            <div className='addMember-form'>
                <span className='create-member-span'>대표 사진</span>
                <label className={change[0] === false ? 'addImg' : 'hidden'} htmlFor='mainImg_file'></label>
                <input className='hidden' id='mainImg_file' type='file'
                       onChange={(e)=>{onChangeImage(e,0)}}/>
                <img alt='멤버이미지' src={fileUrl[0]} width={150} height={150} className={change[0] === false ? 'hidden' : ''}/>
            </div>
            </div>
            <div className='profile-sub-img'>
                <div className='addMember-form'>
                    <span className='create-member-span'>매력 사진</span>
                    <label className={change[1] === false ? 'addImg' : 'hidden'} htmlFor='subImg_file1'></label>
                    <input className='hidden' id='subImg_file1' type='file'
                           onChange={(e)=>{onChangeImage(e,1)}}/>
                    <img alt='멤버이미지' src={fileUrl[1]} width={150} height={150} className={change[1] === false ? 'hidden' : ''}/>
                </div>
                <div className='addMember-form'>
                    <span className='create-member-span'>매력 사진</span>
                    <label className={change[2] === false ? 'addImg' : 'hidden'} htmlFor='subImg_file2'></label>
                    <input className='hidden' id='subImg_file2' type='file'
                           onChange={(e)=>{onChangeImage(e,2)}}/>
                    <img alt='멤버이미지' src={fileUrl[2]} width={150} height={150} className={change[2] === false ? 'hidden' : ''}/>
                </div>
                <div className='addMember-form'>
                    <span className='create-member-span'>매력 사진</span>
                    <label className={change[3] === false ? 'addImg' : 'hidden'} htmlFor='subImg_file3'></label>
                    <input className='hidden' id='subImg_file3' type='file'
                           onChange={(e)=>{onChangeImage(e,3)}}/>
                    <img alt='멤버이미지' src={fileUrl[3]} width={150} height={150} className={change[3] === false ? 'hidden' : ''}/>
                </div>
            </div>
            <div className='profile-component'>
                <h3 className='signup-h3'>거주지</h3>
                <select onChange={(e)=>{
                    setLocationTemp(e.target.value);
                }}>
                    {renderSelect}
                </select>
                <select onChange={(e)=> {
                    setLocation(Object.getOwnPropertyNames(locationJson[locationTemp])[0] + " " + e.target.value);
                }}>
                    {renderLocation}
                </select>
            </div>
            <div className='profile-component'>
                <button onClick={onClickButton} className="signup-button">등록</button>
            </div>
            <Modal open={modal} closeModal={closeModal} header={"안내"}>
                {modalMsg}
            </Modal>
            <Footer/>
        </div>
    );
};

export default SetProfile;