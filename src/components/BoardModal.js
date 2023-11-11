import { Button, Input, Modal, DatePicker } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { getUser } from "../application/services/auth";
import { convertUser } from "../utils/convertFromRaw";
import { ConferenceFormType } from "../Constants";
import MDEditor from "@uiw/react-md-editor";
import { v4 as uuid } from "uuid";

export const BoardModal = (props) => {
    const { TextArea } = Input;
    const { closeModal, addBoard, visible, board, type, updateBoard } = props;
    const defaultConference = {
        title: "",
        timeOccur: "",
        organizer: convertUser(getUser()),
        location: "",
        paperRequirement: "",
        deadlineSubmission: "",
        joinTarget: "",
        postMd: "",
        lanes: [
            {
                id: uuid(),
                currentPage: 1,
                title: "Paper submitted for conference",
                cards: [],
            },
            {
                id: uuid(),
                currentPage: 1,
                title: "Reject",
                cards: [],
            },
            {
                id: uuid(),
                currentPage: 1,
                title: "Accept",
                cards: [],
            },
        ],
    };
    const [conference, setConference] = useState(
        board && type === ConferenceFormType.UPDATE ? board : defaultConference
    );
    const [loading, setLoading] = useState(false);

    const {
        title,
        timeOccur,
        organizer,
        location,
        paperRequirement,
        deadlineSubmission,
        joinTarget,
        postMd,
    } = conference;

    const isEmptyText = (text) => !text || !text.trim();

    const handleSubmitBoard = async (event) => {
        setLoading(true);
        event.preventDefault();
        if (isEmptyText(title)) {
            return;
        }
        if (type === ConferenceFormType.CREATE) {
            await addBoard(conference);
        } else {
            await updateBoard(board.key, conference);
        }
        setLoading(false);
    };

    const handleTitleChange = (e) => {
        setConference((conference) => ({
            ...conference,
            title: e.target.value,
        }));
    };

    const handleDateChange = (date) => {
        setConference((conference) => ({
            ...conference,
            timeOccur: date.toISOString(),
        }));
    };

    const handleLocationChange = (e) => {
        setConference((conference) => ({
            ...conference,
            location: e.target.value,
        }));
    };

    const handlePaperRequirementChange = (e) => {
        setConference((conference) => ({
            ...conference,
            paperRequirement: e.target.value,
        }));
    };

    const handleDeadlineChange = (date) => {
        setConference((conference) => ({
            ...conference,
            deadlineSubmission: date.toISOString(),
        }));
    };

    const handleJoinTargetChange = (e) => {
        setConference((conference) => ({
            ...conference,
            joinTarget: e.target.value,
        }));
    };

    const handlePostMdChange = (value) => {
        setConference((conference) => ({
            ...conference,
            postMd: value,
        }));
    };

    return (
        // <div
        //     role="button"
        //     tabIndex="-1"
        //     onClick={(e) => {
        //         e.stopPropagation();
        //     }}
        //     onKeyDown={() => {}}
        //     className={!visible && 'hidden'}
        // >
        <Modal
            title={type === ConferenceFormType.CREATE ? "Add new conference" : "Update conference"}
            width="1300px"
            visible={visible}
            onCancel={closeModal}
            footer={null}
        >
            <form className={`w-full`} onSubmit={(event) => handleSubmitBoard(event)}>
                <div className="flex justify-between gap-5">
                    <div className="mb-5 w-1/2">
                        <label htmlFor="organizer">Organizer (You)</label>
                        <Input
                            onChange={handleTitleChange}
                            value={organizer?.displayName || ""}
                            id="organizer"
                            disabled
                        />
                    </div>
                    <div className="mb-5 w-1/2">
                        <label htmlFor="title">Title *</label>
                        <Input
                            onChange={handleTitleChange}
                            value={title}
                            id="title"
                            placeholder="Title"
                        />
                    </div>
                </div>

                <div className="flex justify-between gap-5">
                    <div className="mb-5 w-1/2">
                        <label htmlFor="timeOccur">Time occur</label>
                        <DatePicker
                            value={timeOccur ? moment(timeOccur) : null}
                            showTime
                            onChange={handleDateChange}
                            className="w-full"
                            id="timeOccur"
                            defaultValue={undefined}
                        />
                    </div>

                    <div className="mb-5 w-1/2">
                        <label htmlFor="title">Location</label>
                        <Input
                            onChange={handleLocationChange}
                            value={location}
                            id="location"
                            placeholder="Location"
                        />
                    </div>
                </div>

                <div className="mb-5">
                    <label htmlFor="title">Paper requirement description</label>

                    <TextArea
                        placeholder="Description"
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        value={paperRequirement}
                        onChange={handlePaperRequirementChange}
                    />
                </div>

                <div className="flex justify-between gap-5">
                    <div className="mb-5 w-1/2">
                        <label htmlFor="timeOccur">Paper submit deadline</label>
                        <DatePicker
                            value={deadlineSubmission ? moment(deadlineSubmission) : null}
                            showTime
                            onChange={handleDeadlineChange}
                            className="w-full"
                            id="timeOccur"
                            defaultValue={undefined}
                        />
                    </div>

                    <div className="mb-5 w-1/2">
                        <label htmlFor="title">Join target</label>
                        <Input
                            onChange={handleJoinTargetChange}
                            value={joinTarget}
                            id="target"
                            placeholder="Join target"
                        />
                    </div>
                </div>

                <div className="container mt-5 mb-5">
                    <MDEditor value={postMd} onChange={handlePostMdChange} />
                    {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
                </div>

                <Button
                    type="primary"
                    onClick={(event) => handleSubmitBoard(event)}
                    loading={loading}
                    disabled={isEmptyText(title)}
                >
                    {type === ConferenceFormType.CREATE ? "Add" : "Update"}
                </Button>
            </form>
        </Modal>
        // </div>
    );
};

BoardModal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
};
