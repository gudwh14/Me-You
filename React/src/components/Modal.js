
const Modal = ({children, open, closeModal, header})=> {


    return (
        <div className={open ? 'modal-open' : 'modal-close'}>
            <div className='modal'>
                <div className='modal-header'>
                    <span>{header}</span>
                </div>
                <div className='modal-main'>
                    {children}
                </div>
                <div className='modal-footer'>
                    <button onClick={closeModal}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;