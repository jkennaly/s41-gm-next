import React, { useState } from 'react';
import AppModal from '../Modal';

const AddTraitButton = ({ modalIsOpen, setModalIsOpen, handleSubmit, content: baseContent, heading }) => {
    const [traitText, setTraitText] = useState('');

    const content = (onSubmit) => (
        <form onSubmit={onSubmit}>
            {baseContent}
        </form>
    );

    return (
        <div>
            <AppModal 
                modalIsOpen={modalIsOpen} 
                closeModal={() => setModalIsOpen(false)} 
                content={content} 
                onSubmit={handleSubmit} 
                heading={heading}
            />
        </div>
    );
};

export default AddTraitButton;
