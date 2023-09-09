const Modal: React.FC<{ ModalContent: React.ElementType; closeModal: () => void }> = ({ ModalContent, closeModal }) => {
    const closeModalHandler = (event: React.SyntheticEvent) => {
        event.stopPropagation();
        if (event.target != event.currentTarget) {
            return;
        }
        closeModal();
    };

    return (
        <div className="modal" onMouseDown={closeModalHandler}>
            <div className="modal-content">
                <ModalContent closeModal={closeModal} />
            </div>
        </div>
    );
};

export default Modal;
