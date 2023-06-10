import { useState } from 'react';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { BoardModal } from './BoardModal';
import { ConferenceFormType } from '../Constants';

export const BoardTitle = ({
    title,
    handleBoardClick,
    addition,
    handleBoardStarToggling,
    starred,
    board,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
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
            {!addition && (
                <div className="flex justify-between">
                    <Button
                        className="rounded-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModalVisible(true);
                        }}
                    >
                        Update conference
                    </Button>
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
                </div>
            )}
            <BoardModal
                closeModal={(e) => {
                    e.stopPropagation();
                    setModalVisible(false);
                }}
                visible={modalVisible}
                type={ConferenceFormType.UPDATE}
                board={board}
            ></BoardModal>
        </div>
    );
};

BoardTitle.propTypes = {
    title: PropTypes.string.isRequired,
    addition: PropTypes.bool,
    handleBoardClick: PropTypes.func,
    handleBoardStarToggling: PropTypes.func,
    starred: PropTypes.bool,
};
