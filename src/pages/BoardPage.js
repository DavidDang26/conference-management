import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { boardService } from "../data";
import { withAuthorization } from "../auth/auth-hoc";
import { BoardSkeleton } from "../components/BoardSkeleton";
import CardModal from "../components/CardModal";
import SideBar from "../components/SideBar";
import Board from "../components/Board";
import { Button } from "antd";
import emailjs from "@emailjs/browser";

export const BoardPage = withRouter(
    withAuthorization((authUser) => !!authUser)((props) => {
        const [board, setBoard] = useState({
            lanes: [],
        });
        const [loading, setLoading] = useState(false);
        const [visible, setVisible] = useState(false);
        const [activeCard, setActiveCard] = useState({});
        const [activeLane, setActiveLane] = useState({});
        const history = useHistory();

        const { authUser: user } = props;

        useEffect(() => {
            (async () => {
                setLoading(true);
                await fetchBoard();
                setLoading(false);
            })();
        }, []);

        const fetchBoard = async () => {
            const data = (await boardService.getBoard(boardId())).val();
            setBoard(prepareBoard(data));
        };

        const addComment = async (comment) => {
            await boardService.updateBoard(boardId(), {
                ...board,
                lanes: board.lanes.map((laneItem) => {
                    if (laneItem.id !== activeLane.id) return laneItem;
                    else
                        return {
                            ...laneItem,
                            cards: laneItem.cards.map((cardItem) => {
                                if (cardItem.id !== activeCard.id) return cardItem;
                                else
                                    return {
                                        ...cardItem,
                                        comments: (cardItem?.comments || []).concat([comment]),
                                    };
                            }),
                        };
                }),
            });
        };

        const sendEmail = async (e) => {
            e.preventDefault();

            const data = (await boardService.getBoard(boardId())).val();
            const updateBoard = prepareBoard(data);
            const acceptedLane = updateBoard.lanes.find((lane) => lane.title === "Accept");
            const listEmail = acceptedLane.cards.map((card) => card.author.email);
            const decision = window.confirm("Send email for:\n " + listEmail.join("\n"));
            if (!decision) return;

            emailjs
                .sendForm("service_sry761i", "template_v05mr49", e.target, "RrLD5e67Nsqrrz3xR")
                .then(
                    (result) => {
                        window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
                    },
                    (error) => {
                        console.log(error.text);
                    }
                );
        };

        const prepareBoard = (board) => ({
            ...board,
            lanes: (board?.lanes || []).map((lane) => ({
                ...lane,
                cards: lane?.cards || [],
            })),
        });

        const boardId = () => props.match?.params?.board;

        const handleDataChange = async (data) => {
            await boardService.updateBoard(boardId(), data);
            await fetchBoard();
        };

        if (loading) {
            return <BoardSkeleton count={5} />;
        }

        return (
            <div className="gap-5 h-full flex ml-12 ">
                <div className="w-1/6">
                    <SideBar />
                </div>
                <div className="w-5/6">
                    <div className="text-3xl pt-16 text-center bg-gray-700 text-white font-bold">
                        {board.title}
                    </div>
                    <div className="bg-gray-700 px-6 flex gap-5 py-2">
                        <Button
                            type="primary"
                            onClick={() => history.push(`/registration/${boardId()}`)}
                        >
                            Registration
                        </Button>
                        <form onSubmit={sendEmail}>
                            <input
                                className="bg-green-500 px-5 py-1 text-white rounded-sm cursor-pointer"
                                type="submit"
                                value="Send email for accepted author"
                            />
                        </form>
                    </div>
                    <Board
                        className={`pt-5 px-5 bg-gray-700 h-full`}
                        canAddLanes={
                            board.organizer && board.organizer.id && board.organizer.id === user.uid
                        }
                        cardDraggable={
                            board.organizer && board.organizer.id && board.organizer.id === user.uid
                        }
                        editable={
                            board.organizer && board.organizer.id && board.organizer.id === user.uid
                        }
                        draggable={
                            board.organizer && board.organizer.id && board.organizer.id === user.uid
                        }
                        data={{
                            lanes: board.lanes || [],
                        }}
                        onDataChange={handleDataChange}
                        onCardClick={(cardId, metadata, laneId) => {
                            const laneSelected = board.lanes.find(
                                (laneItem) => laneItem.id === laneId
                            );
                            const cardSelected = (laneSelected?.cards || []).find(
                                (cardItem) => cardItem.id === cardId
                            );
                            setActiveLane(laneSelected);
                            setActiveCard(cardSelected);
                            setVisible(true);
                        }}
                        hideCardDeleteIcon={true}
                    />
                    <CardModal
                        closeModal={() => setVisible(false)}
                        visible={visible && activeCard.id}
                        card={activeCard}
                        addComment={addComment}
                        key={activeCard?.id}
                        user={user}
                        board={board}
                        boardId={boardId()}
                        lane={activeLane}
                        setBoard={setBoard}
                        prepareBoard={prepareBoard}
                    />
                </div>
            </div>
        );
    })
);
