import Lottie from "lottie-react";
import heartAnimation from "../lottie/heartAnimation.json";
import {Link} from "react-router-dom";

const Start = () => {
    return (
        <div className='start'>
            <Lottie animationData={heartAnimation} className="heartAnimation"></Lottie>
            <span className="start-hello">새로운 만남 재밌는 모임</span>
            <span className="start-hello">나만의 상대 찾아보기</span>
            <Link className="start-button" to="/login">시작하기</Link>
        </div>
    );
};

export default Start;
