import Nav from "./Nav";
import {useHistory} from "react-router-dom";
import {useState} from 'react';

const Header = () => {
    const history = useHistory();
    const [alarm , setAlarm] = useState(10);

    const onClickLogo = ()=> {
        history.push("/home");
    }

    const onClickUser = ()=> {
        history.replace("/home/inform");
    }

    const onClickChat = ()=> {
        history.push("/home/chatMenu");
    }
    return  (
        <div className='header-container'>
            <header>
                <div className='header-top'>
                    <h1 onClick={onClickLogo} className='logo'>미유미유</h1>
                    <Nav/>
                </div>
                <div className="header-inform">
                    <span onClick={onClickUser} className="header-user"></span>
                    <div onClick={onClickChat} className="header-chat-div">
                        <div className={alarm ? 'header-chat-alarm' : 'hidden'}>
                            <span>{alarm}</span>
                        </div>
                        <span className="header-chat"></span>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;