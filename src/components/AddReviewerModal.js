import React from 'react';
import { Modal } from 'antd';

const AddReviewerModal = ({ visible, closeModal }) => {
    return (
        <Modal
            visible={visible}
            onCancel={closeModal}
            title="Add reviewer for the conference"
        ></Modal>
    );
};

export default AddReviewerModal;
