import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserOutlined, StarOutlined } from "@ant-design/icons";
import { boardService } from "../data";
import { withAuthorization } from "../auth/auth-hoc";
import { BoardTitle } from "../components/BoardTitle";
import { BoardModal } from "../components/BoardModal";
import { BoardsPageSkeleton } from "../components/BoardsPageSkeleton";
import { ConferenceFormType } from "../Constants";
import { objectToArray } from "../utils";
import SideBar from "../components/SideBar";

export const BoardsPage = withAuthorization((authUser) => !!authUser)((props) => {
    const [boards, setBoards] = useState({});
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const history = useHistory();
    const { authUser: user } = props;

    useEffect(() => {
        setLoading(true);
        (async () => {
            await fetchBoards();
        })();
    }, []);

    const fetchBoards = async () => {
        await boardService.userBoards().on("value", (snapshot) => {
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
        await boardService.deleteBoard(board);
    };

    if (loading) {
        return <BoardsPageSkeleton count={4} />;
    }

    const ownerBoards = boards.filter((board) => board.organizer.id === user.uid);

    const reviewerBoards = boards.filter((board) =>
        (board && board.reviewers ? Object.keys(board.reviewers) : []).includes(user.uid)
    );

    const starredBoards = [...ownerBoards, ...reviewerBoards].filter((board) => board.starred);

    return (
        <div className="flex gap-5">
            <div className="w-1/6 ml-12">
                <SideBar />
            </div>
            <div className={`w-5/6 pt-16 py-4 px-3 px-3 mr-8`}>
                {!!starredBoards.length && (
                    <>
                        <div className="flex mb-3 items-center text-xl">
                            <StarOutlined className={`mr-2`} /> Starred Boards
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
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
                )}

                <div className="flex mb-3 items-center text-xl">
                    <UserOutlined className={`mr-2`} />
                    Conference as organizer
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {ownerBoards.map((board) => (
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
                    <BoardTitle
                        title="Add new conference"
                        addition={true}
                        handleBoardClick={() => setModalVisible(true)}
                    />
                </div>

                <div className="flex mt-5 mb-3 items-center text-xl">
                    <UserOutlined className={`mr-2`} />
                    Conference as reviewer
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {reviewerBoards.map((board) => (
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
                </div>

                <BoardModal
                    addBoard={addBoard}
                    closeModal={() => setModalVisible(false)}
                    visible={modalVisible}
                    type={ConferenceFormType.CREATE}
                />
            </div>
        </div>
    );
});
