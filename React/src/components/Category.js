import {useState} from 'react';

const Category = ({setCategory})=> {
    const [all,setAll] = useState('category-span-active');
    const [meeting,setMeeting] = useState('category-span');
    const [blind,setBlind] = useState('category-span');

    const onClickAll = ()=>{
        setCategory('all');
        setAll('category-span-active');
        setMeeting('category-span');
        setBlind('category-span');
    };
    const onClickMan = ()=>{
        setCategory('meeting');
        setAll('category-span');
        setMeeting('category-span-active');
        setBlind('category-span');
    };
    const onClickWoman = ()=>{
        setCategory('blind');
        setAll('category-span');
        setMeeting('category-span');
        setBlind('category-span-active');
    };

    return (
        <div className='category'>
            <span onClick={onClickAll} className={all} >전체</span>
            <span onClick={onClickMan} className={meeting}>미팅</span>
            <span onClick={onClickWoman} className={blind}>소개팅</span>
        </div>
    );
};

export default Category