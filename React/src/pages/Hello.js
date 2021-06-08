import {useHistory} from "react-router-dom";

const Hello = () => {
    const history = useHistory();

    setTimeout(()=> {
        history.push("/home");
    },5000)

    return (
        <div className='hello-container'>
            <div className='hello-span-container'>
                <span className='text-animation'>안녕하세요!</span>
                <span className='text-animation'>회원가입을 축하 드립니다</span>
                <div className='text-animation'>
                   <span className='span-pink'>미유미유</span>
                   <span>를 많이 이용해주세요!</span>
                </div>

                <span className='text-animation'>다음페이지로 자동으로 전환됩니다</span>
            </div>
        </div>
    );
};

export default Hello;