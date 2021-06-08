import {useHistory} from 'react-router-dom'
import {useEffect} from 'react'

const Loading = () => {
    const loginID = sessionStorage.getItem("memberID");
    const history = useHistory();

    useEffect(()=> {
        if(loginID===null) {
            history.push("/login");
        }
    })

    return (
      <div className='loading-div'>
          <span className='loading'></span>
      </div>
    );
}


export default Loading;