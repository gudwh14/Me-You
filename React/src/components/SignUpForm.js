import {useHistory} from 'react-router-dom';
import {useState} from 'react'
import axios from "axios";
import Modal from "./Modal";

const SignUpForm = ()=> {
    const baseUrl = "http://localhost:8080/member/";

    const history = useHistory();
    const [name, setName] = useState('');
    const [userID, setUserID] = useState('');
    const [userPW, setUserPW] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [date, setDate] = useState('2000-01-01');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [job , setJob] = useState('');
    const [belongName, setBelongName] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [modal, setModal] = useState(false);

    const onClick = async ()=> {
        if(name !== '' && userID !== '' && userPW !== '' && age !== '' && gender !== '' && belongName !== '' && job !== '') {
            const Data = {
                name: name,
                userID: userID,
                userPW: userPW,
                age: age,
                gender: gender,
                belong: belongName,
                job: job,
            }
            await axios.post(baseUrl + "sign", Data)
                .then(response => {
                    if (response.status === 200) {
                        window.sessionStorage.setItem("memberID", JSON.stringify(response.data.id));
                        history.push("/hello");
                    }
                })
                .catch((error) => {
                    setModal(true);
                    setErrorMsg(error.response.data);
                })
        }
    };

    const closeModal = () => {
        setModal(false);
    }


    return (
        <div className='signup-form'>
            <div className='input-container'>
                <h3 className='signup-h3'>닉네임</h3>
                <span className='input-span'>
                    <input className='input' type='text' value={name}
                           onChange={(e)=> {setName(e.target.value)}}/>
                    <span className={(name !== '')?  'correct-img' : 'incorrect-img'}></span>
                </span>
                <span className={(name !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>아이디</h3>
                <span className='input-span'>
                    <input className='input' type='text' value={userID}
                           onChange={(e)=> {setUserID(e.target.value)}}/>
                    <span className={(userID !== '')?  'correct-img' : 'incorrect-img'}></span>
                </span>
                <span className={(userID !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>비밀번호</h3>
                <span className='input-span'>
                    <input className='input' type='password' value={userPW}
                           onChange={(e)=> {setUserPW(e.target.value)}}/>
                    <span className={(userPW !== '')?  'correct-img' : 'incorrect-img'}></span>
                </span>
                <span className={(userPW !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>비밀번호 확인</h3>
                <span className='input-span'>
                    <input className='input' type='password' value={pwCheck}
                           onChange={(e)=> {setPwCheck(e.target.value)}}/>
                    <span className={(pwCheck === userPW && pwCheck !== '')?  'correct-img' : 'incorrect-img'}></span>
                </span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>나이</h3>
                <span className='input-span'>
                    <input className='input' type='date' value={date}
                    onChange={(e)=>{
                        setDate(e.target.value);
                        setAge(new Date().toISOString().substring(0,4)-date.substring(0,4) + 1)}}/>
                </span>
                <span className={(age !== '')?  'age-span' : 'error-span'}>{(age !== '') ? age + '세' : '필수 항목입니다'}</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>성별</h3>
                <div className='gender-form'>
                    <input className='input-gender' type='radio' name='gender-group'
                           onClick={()=>{setGender('M')}}/><span className='gender-span'>남자</span>
                    <input className='input-gender' type='radio' name='gender-group'
                           onClick={()=>{setGender('F')}}/><span className='gender-span'>여자</span>
                </div>
                <span className={(gender !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>직업</h3>
                <div className='gender-form'>
                    <input className='input-gender' type='radio' name='job-group'
                           onClick={()=>{setJob('student')}}/><span className='gender-span'>대학생</span>
                    <input className='input-gender' type='radio' name='job-group'
                           onClick={()=>{setJob('worker')}}/><span className='gender-span'>직장인</span>
                </div>
                <span className={(job !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>
            <div className='input-container'>
                <h3 className='signup-h3'>{job ==='worker' ? '회사명' : '대학교명'}</h3>
                <span className='input-span'>
                    <input className='input' type='text' value={belongName}
                    onChange={(e)=>{setBelongName(e.target.value)}}/>
                </span>
                <span className={(belongName !== '')?  'blind-span' : 'error-span'}>필수 항목입니다.</span>
            </div>

            <button type="button" onClick={onClick} className='signup-button'>가입하기</button>
            <Modal open={modal} closeModal={closeModal} header="회원가입 실패">
                {errorMsg}
            </Modal>
        </div>
    )
}

export default SignUpForm;