import {Link, useHistory} from "react-router-dom";
import {useState} from 'react';
import axios from "axios";

const LoginForm = ()=> {
    const history = useHistory();

    const [userID,setUserID] = useState('');
    const [userPW,setUserPW] = useState('');
    const [error,setError] = useState('blind-span')

    const onClickLogin = (event)=> {
        event.preventDefault();
        const data = {
            userID : userID,
            userPW : userPW
        }
        axios.post("http://localhost:8080/member/login",data)
            .then(response => {
                if(response.data) {
                    window.sessionStorage.setItem("memberID",JSON.stringify(response.data.id));
                    history.push('/home');
                }
                else {
                    setUserID('');
                    setUserPW('');
                    setError('error-span');
                }
            })
    }

    return (
        <div className='loginForm-container'>
            <form className='loginForm-main-div' onSubmit={onClickLogin}>
                <span className='input-span'>
                    <input className='input' placeholder='아이디' type='text' value={userID}
                    onChange={(e)=> {setUserID(e.target.value)}}/>
                </span>
                <span className='input-span'>
                    <input className='input' placeholder="비밀번호" type='password' value={userPW}
                           onChange={(e)=> {setUserPW(e.target.value)}}/>
                </span>
                <div>
                    <button type="submit" onClick={onClickLogin} className='signup-button'>Login</button>
                    <span className={error}>아이디와 비밀번호를 확인해 주세요.</span>
                </div>
            </form>
            <div className='loginForm-link'>
                <span>아직 회원이 아니신가요? </span>
                <Link to="/signup" className='link-blue'>회원가입</Link>
            </div>
            <div className='loginForm-link'>
                <span>비밀번호를 잊어버리셨나요? </span>
                <Link to="/find" className='link-blue'>찾기</Link>
            </div>
        </div>
    );
};

export default LoginForm;