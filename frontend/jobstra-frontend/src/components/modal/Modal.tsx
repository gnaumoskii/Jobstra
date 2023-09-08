const Modal = ({ModalContent, closeModal}: {ModalContent: React.ElementType, closeModal: () => void}) => {
    const closeModalHandler = (event: React.SyntheticEvent) => {

        event.stopPropagation();
        if(event.target != event.currentTarget) {
            return;
        }
        closeModal();
    }



    return (
        <div className='modal' onMouseDown={closeModalHandler}>
            <div className='modal-content'>
                <ModalContent closeModal={closeModal}/>
            </div>
        </div>
    )
}

export default Modal