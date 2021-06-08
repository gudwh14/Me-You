import {useHistory} from "react-router-dom";

const CardList = ({blindData, today})=> {
    const baseUrl = "http://localhost:8080/";
    const history = useHistory();

    const renderCardList = blindData.map((data)=> {
        const imgUrl = data.profile_img.split(":")[0];
        return (
            <div key={data.memberID} className={today ? 'today-cardList-container': 'cardList-container'} onClick={
                ()=> {
                    history.push("/home/blindInform/" + data.memberID);
                }
            }>
                <img className='card-img' src={baseUrl + imgUrl} width={150} height={150} alt='대표이미지'/>
                <div className='cardList-top'>
                    <span>{data.belong}</span>
                    <span>{data.age + "살"}</span>
                </div>
                <span className='cardList-address'>{data.location}</span>
            </div>
        );
    });

    return (
        <>
            {renderCardList}
        </>
    );
};

export default CardList;