import { useState } from 'react';
import { StarFilled, StarOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { BoardModal } from './BoardModal';
import { ConferenceFormType } from '../Constants';
import { boardService } from '../application/services/board';
import AddReviewerModal from '../components/AddReviewerModal';

export const BoardTitle = ({
    title,
    handleBoardClick,
    addition,
    handleBoardStarToggling,
    handleDeleteBoard,
    starred,
    board,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);

    const updateConference = async (key, data) => {
        await boardService.updateBoard(key, data);
    };
    return (
        <div
            role="button"
            tabIndex="0"
            onKeyDown={() => {}}
            onClick={() => handleBoardClick()}
            className={`h-32 rounded-md p-2 font-semibold flex flex-col ${
                addition ? 'bg-gray-200 text-gray-900' : 'bg-blue-500 text-white justify-between'
            }`}
        >
            <div className={addition ? 'm-auto' : ''}>{title}</div>
            <div
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <BoardModal
                    closeModal={(e) => {
                        e.stopPropagation();
                        setModalVisible(false);
                    }}
                    visible={modalVisible}
                    type={ConferenceFormType.UPDATE}
                    board={board}
                    updateBoard={(key, data) => {
                        updateConference(key, data);
                        setModalVisible(false);
                    }}
                ></BoardModal>
                <AddReviewerModal
                    closeModal={(e) => {
                        e.stopPropagation();
                        setReviewModalVisible(false);
                    }}
                    visible={reviewModalVisible}
                />
            </div>
            {!addition && (
                <div className="flex justify-between items-center">
                    <Button
                        className="rounded-md font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModalVisible(true);
                        }}
                        type="primary"
                        style={{ background: 'rgb(217 119 6)' }}
                    >
                        Update conference
                    </Button>
                    <Button
                        className="rounded-md font-bold"
                        onClick={(e) => {
                            e.stopPropagation();
                            setReviewModalVisible(true);
                        }}
                        style={{ background: 'rgb(16 185 129)' }}
                        type="primary"
                    >
                        Add reviewer
                    </Button>
                    <div className="flex gap-2">
                        <div
                            role="button"
                            tabIndex="-1"
                            className="flex"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBoardStarToggling();
                            }}
                            onKeyDown={() => {}}
                        >
                            {starred ? (
                                <StarFilled className="transform transition-all text-white text-opacity-75 hover:text-opacity-100 hover:translate-x-px scale-100 hover:scale-110 mt-auto" />
                            ) : (
                                <StarOutlined className="transform transition-all text-white text-opacity-75 hover:text-opacity-100 hover:translate-x-px scale-100 hover:scale-110 mt-auto" />
                            )}
                        </div>
                        <div
                            role="button"
                            tabIndex="-1"
                            className="flex"
                            onKeyDown={() => {}}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBoard();
                            }}
                        >
                            <DeleteOutlined className="transform transition-all text-white text-opacity-75 hover:text-opacity-100 hover:translate-x-px scale-100 hover:scale-110 mt-auto" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

BoardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    addition: PropTypes.bool,
    handleBoardClick: PropTypes.func,
    handleBoardStarToggling: PropTypes.func,
    starred: PropTypes.bool,
    handleDeleteBoard: PropTypes.func,
};
