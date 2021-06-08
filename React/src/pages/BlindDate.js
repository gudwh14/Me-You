import CardList from "../components/CardList";
import Footer from "../components/Footer";
import {useState,useEffect} from "react";
import axios from "axios";
import Loading from "../components/Loading";

const BlindDate = ()=> {
    const [blindData, setBlindData] = useState(null);

    useEffect(()=> {
        window.scrollTo(0,0);
        try {
            axios.get("http://localhost:8080/blind")
                .then((response) => {
                    setBlindData(response.data);
                })
        }
        catch (e) {
            console.log(e);
        }
    },[])
    return (
        <div className='blindDate-container'>
            { blindData
                ?
                <>
                    <h2>나만의 상대를 찾아보세요</h2>
                    <div className='blindDate-cardView'>
                        <CardList blindData={blindData} today={false}/>
                    </div>
                </>
                :
                <Loading/>
            }
            <Footer/>
        </div>
    )
}

export default BlindDate;