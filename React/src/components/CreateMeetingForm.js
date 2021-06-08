import {useEffect, useState} from "react";
import axios from "axios";

const CreateMeetingForm = ({openModal})=> {
    const loginID = sessionStorage.getItem("memberID");
    const [number,setNumber] = useState(2);
    const [introduction, setIntroduction] = useState('');
    const [fileUrl, setFileUrl] = useState([null,null,null,null]);
    const [change, setChange] = useState([false,false,false,false]);
    const [numArray, setNumArray] = useState([]);

    const [imgFile, setImgFile] = useState([null,null,null,null]);

    const onChangeNumber = (event)=> {
        const value = event.target.value;
        setNumber(parseInt(value));
    }
    useEffect(()=> {
        let tempArray = Array(number);
        for (let index=0; index<tempArray.length; index++) {
            tempArray[index] = index+1;
        }
        setNumArray([...tempArray]);
    },[number]);

    const onChangeImage = (event, num) => {
        // ImgFile 변수
        const tempImgFile = [...imgFile];
        tempImgFile.splice(num-1,1,event.target.files[0]);
        setImgFile(tempImgFile);

        // FileUrl 변수
        const imgUrl = URL.createObjectURL(event.target.files[0]);
        const tempUrl = [...fileUrl];
        tempUrl.splice(num-1,1,imgUrl);
        setFileUrl(tempUrl);
        // change 변수
        const temp = [...change];
        temp.splice(num-1,1,true);
        setChange(temp);
    }

    const renderAddImg = numArray.map((num)=> {
        return(
            <div  key={num} className='addMember-form'>
                <span className='create-member-span'>{num === 1 ? "👑" : "멤버 "+num}</span>
                <label className={change[num-1] === false ? 'addImg' : 'hidden'} htmlFor={'input_file'+num}></label>
                <input className='hidden' id={'input_file'+num} type='file'
                       onChange={(e)=> onChangeImage(e,num)}/>
                <img alt='멤버이미지' src={fileUrl[num-1]} width={150} height={150} className={change[num-1] === false ? 'hidden' : 'card-img'}/>
            </div>
        );
    });

    const onClickAdd = async () => {
        try {
            const formData = new FormData();
            formData.append('number',String(number));
            formData.append('memberId', loginID);
            formData.append('introduction',introduction);
            for (let i = 0; i <imgFile.length; i++) {
                formData.append('files', imgFile[i]);
            }

            const url = "http://localhost:8080/meeting/create";
            await axios.post(url,formData)
                .then((response)=>{
                    console.log(response.status);
                    if(response.status === 200) {
                        openModal();
                    }
                    else {
                        //예외 처리
                    }
                });
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className='create-component'>
                <div className='create-title'>
                    <span className='create-main-span'>미팅 인원 수</span>
                    <span className='create-sub-span'>미팅 할 인원 수를 선택해 주세요.</span>
                </div>
                <select value={number} onChange={onChangeNumber}>
                    <option value={2}>2 명</option>
                    <option value={3}>3 명</option>
                    <option value={4}>4 명</option>
                </select>
            </div>

            <div className='create-component'>
                <div className='create-title'>
                    <span className='create-main-span'>멤버소개</span>
                    <span className='create-sub-span'>멤버들의 사진을 등록해 보세요!</span>
                </div>
                <div className='addMember'>
                    {renderAddImg}
                </div>
            </div>

            <div className='create-component'>
                <div className='create-title'>
                    <span className='create-main-span'>소개글</span>
                    <span className='create-sub-span'></span>
                </div>
                <textarea value={introduction} placeholder='소개' className='memo' type='text'
                          onChange={(e)=>{setIntroduction(e.target.value)}}/>
            </div>

            <div className='create-component'>
                <button onClick={onClickAdd} className='signup-button'>등록하기</button>
            </div>
        </>
    );
};

export default CreateMeetingForm;