import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Board from 'react-trello';
import { boardService } from '../application/services';
import { withAuthorization } from '../auth/auth-hoc';
import { BoardSkeleton } from '../components/BoardSkeleton';
import CardModal from '../components/CardModal';
import { useStateValue } from '../application/state-provider';

export const BoardPage = withRouter(
    withAuthorization((authUser) => !!authUser)((props) => {
        const [state, dispatch] = useStateValue();
        const [board, setBoard] = useState({
            lanes: [],
        });
        const [loading, setLoading] = useState(false);
        const [visible, setVisible] = useState(false);
        const [activeCard, setActiveCard] = useState({});
        const [activeLane, setActiveLane] = useState({});
        const { user } = state;

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

        // Fill empty properties that are important for Board component
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

        console.log(board);

        return (
            <>
                <div className="text-3xl pt-16  text-center bg-blue-400 text-white font-bold">
                    {board.title}
                </div>
                <Board
                    className={`pt-5 bg-blue-400 h-full`}
                    canAddLanes={
                        board.organizer &&
                        board.organizer.id &&
                        board.organizer.id === state.user.uid
                    }
                    cardDraggable={
                        board.organizer &&
                        board.organizer.id &&
                        board.organizer.id === state.user.uid
                    }
                    editable={
                        board.organizer &&
                        board.organizer.id &&
                        board.organizer.id === state.user.uid
                    }
                    draggable={
                        board.organizer &&
                        board.organizer.id &&
                        board.organizer.id === state.user.uid
                    }
                    data={{
                        lanes: board.lanes || [],
                    }}
                    onDataChange={handleDataChange}
                    onCardClick={(cardId, metadata, laneId) => {
                        const laneSelected = board.lanes.find((laneItem) => laneItem.id === laneId);
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
                />
            </>
        );
    })
);
