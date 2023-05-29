import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AppModal = ({ modalIsOpen, closeModal, content, onSubmit, heading }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
        >
            <h2>{heading}</h2>
            {content(onSubmit)}
        </Modal>
    );
};

export default AppModal;
