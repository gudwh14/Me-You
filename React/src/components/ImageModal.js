
const ImageModal = ({open , closeModal, imgSrc}) => {

    return (
        <div className={open ? 'modal-open' : 'modal-close'}>
            <div className='imageModal'>
                <button onClick={closeModal}>닫기</button>
                <img alt="큰 이미지" src={imgSrc} width={500} height={500}/>
            </div>
        </div>
    )
}

export default ImageModal;