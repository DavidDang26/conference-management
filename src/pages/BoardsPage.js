import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserOutlined, StarOutlined } from '@ant-design/icons';
import { boardService } from '../application/services';
import { withAuthorization } from '../auth/auth-hoc';
import { BoardTitle } from '../components/BoardTitle';
import { BoardModal } from '../components/BoardModal';
import { BoardsPageSkeleton } from '../components/BoardsPageSkeleton';
import { useStateValue } from '../application/state-provider';
import { ConferenceFormType } from '../Constants';
import { objectToArray } from '../utils';

export const BoardsPage = withAuthorization((authUser) => !!authUser)(() => {
    const [state, dispatch] = useStateValue();
    const [boards, setBoards] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();
    const { user } = state;

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchBoards();
        })();
    }, []);

    const fetchBoards = async () => {
        await boardService.userBoards().on('value', (snapshot) => {
            if (!snapshot) {
                return;
            }
            setBoards(objectToArray(snapshot.val() || {}));
            setLoading(false);
        });
    };

    const addBoard = async (board) => {
        await boardService.addBoard(board);
        setModalVisible(false);
    };

    const starBoard = async (board, starred) => {
        await boardService.updateBoard(board, { starred });
    };

    const deleteBoard = async (board) => {
        console.log('date');
        await boardService.deleteBoard(board);
    };


    if (loading) {
        return <BoardsPageSkeleton count={4} />;
    }

    const starredBoards = boards.filter((board) => board.starred);

    return (
        <div className={`pt-16 py-4 px-3`}>
            {/* {!!starredBoards.length && (
                <>
                    <div className="flex mb-3 items-center text-xl">
                        <StarOutlined className={`mr-2`} /> Starred Boards
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {starredBoards.map((board) => (
                            <BoardTitle
                                key={board?.key}
                                title={board.title}
                                handleBoardClick={() => history.push(`boards/${board?.key}`)}
                                handleBoardStarToggling={() =>
                                    starBoard(board?.key, !board.starred)
                                }
                                handleDeleteBoard={() => deleteBoard(board?.key)}
                                starred={board.starred}
                                board={board}
                            />
                        ))}
                    </div>
                </>
            )} */}
            {/* <div>
                <img src={user.photoURL} alt="" />
            </div> */}

            <div className="flex mb-3 items-center text-xl">

            <UserOutlined className={`mr-2`} />
                Conference as organizer
            </div>

            <div className="grid grid-cols-4 gap-4">
                {boards
                    .filter((conference) => conference.organizer.id === user.uid)
                    .map((board) => (
                        <BoardTitle
                            key={board?.key}
                            title={board.title}
                            handleBoardClick={() => history.push(`boards/${board?.key}`)}
                            handleBoardStarToggling={() => starBoard(board?.key, !board.starred)}
                            handleDeleteBoard={() => deleteBoard(board?.key)}
                            starred={board.starred}
                            board={board}
                        />
                    ))}
            </div>

            <div className="flex mb-3 items-center text-xl">
                <UserOutlined className={`mr-2`} />
                Conference as reviewer
            </div>

            <div className="grid grid-cols-4 gap-4">
            {boards.filter((conference) =>
                        (conference && conference.reviewers
                            ? Object.keys(conference.reviewers)
                            : []
                        ).includes(user.uid)
                    ).map((board) => (
                        <BoardTitle
                            key={board?.key}
                            title={board.title}
                            handleBoardClick={() => history.push(`boards/${board?.key}`)}
                            handleBoardStarToggling={() => starBoard(board?.key, !board.starred)}
                            handleDeleteBoard={() => deleteBoard(board?.key)}
                            starred={board.starred}
                            board={board}
                            reviewConference={true}
                        />
                    ))}
                <BoardTitle
                    title="Add new conference"
                    addition={true}
                    handleBoardClick={() => setModalVisible(true)}
                />
            </div>

            <BoardModal
                addBoard={addBoard}
                closeModal={() => setModalVisible(false)}
                visible={modalVisible}
                type={ConferenceFormType.CREATE}
            />
          
        </div>
    );
});
