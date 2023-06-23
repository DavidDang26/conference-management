import { Button, Input, Modal, DatePicker } from 'antd';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ConferenceFormType } from '../Constants';

export const BoardModal = (props) => {
    const { closeModal, addBoard, visible, board, type } = props;
    const defaultConference = {
        title: '',
        timeOccur: '',
    };
    const [conference, setConference] = useState(board || defaultConference);
    const { title, timeOccur } = conference;
    const [loading, setLoading] = useState(false);

    const isEmptyText = (text) => !text || !text.trim();

    const handleCreateBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(title)) {
            return;
        }
        await addBoard(conference);
        // setBoardTitle('');
        setLoading(false);
    };

    const handleTitleChange = (e) => {
        setConference((conference) => ({
            ...conference,
            title: e.target.value,
        }));
    };

    const handleDateChange = (date, dateString) => {
        setConference((conference) => ({
            ...conference,
            timeOccur: date.toISOString(),
        }));
    };

    return (
        <Modal
            title="Add new conference"
            width="400px"
            visible={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleCreateBoard(event)}>
                <div className="mb-5">
                    <label htmlFor="title">Title *</label>
                    <Input
                        onChange={handleTitleChange}
                        value={title}
                        id="title"
                        placeholder="Title"
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="timeOccur">Time occur</label>
                    <DatePicker
                        value={timeOccur ? moment(timeOccur) : null}
                        showTime
                        onChange={handleDateChange}
                        className="w-full mb-5"
                        id="timeOccur"
                        defaultValue={undefined}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={(event) => handleCreateBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(title)}
                >
                    Add
                </Button>
            </form>
        </Modal>
    );
};

BoardModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
