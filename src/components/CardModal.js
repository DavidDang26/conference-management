import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { v4 as uuid } from "uuid";
import { convertUser } from "../utils/convertFromRaw";
import moment from "moment";
import Comment from "./Comment";
import FeedBackModal from "./FeedBackModal";
import { Button } from "antd";
import { boardService } from "../data";

const CardModal = ({
    board,
    boardId,
    card,
    lane,
    closeModal,
    visible,
    addComment,
    user,
    setBoard,
    prepareBoard,
}) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(card.comments);
    const [feedBackModalVisible, setFeedBackModalVisible] = useState(false);

    const { author } = card;

    const handleCommentSubmit = async (e) => {
        if (e.code !== "Enter") return;
        else {
            const newComment = {
                id: uuid(),
                content: comment,
                commenter: convertUser(user),
                createdAt: moment().toISOString(),
            };
            await addComment(newComment);
            setComments((comments) => [...comments, newComment]);
            setComment("");
        }
    };

    return (
        <Modal
            visible={visible}
            title={card?.title || ""}
            onCancel={closeModal}
            footer={null}
            width="700px"
        >
            <div className="mb-5">
                <div className="bg-blue-200 w-1/3 px-3 py-2 mb-3 rounded-md">
                    <div className="font-bold">Author informations</div>
                    {author && (
                        <>
                            <div className="flex items-center gap-3">
                                <img
                                    className="rounded-full"
                                    src={author.photoURL}
                                    alt="author ava"
                                    width={50}
                                />
                                <div className="text-xl">{author.displayName}</div>
                            </div>

                            <div className="italic">{author.email}</div>
                        </>
                    )}
                </div>
                <div className="mb-5">
                    <div className="font-bold text-xl">Payment State </div>
                    <div
                        className={`bg-${
                            card?.paymentStatus === "Paid" ? "green" : "red"
                        }-400 w-20 rounded-md font-bold flex items-center justify-center`}
                    >
                        <div className="mx-3">{card?.paymentStatus || "Pending"}</div>
                    </div>
                </div>
                <div className="font-bold text-xl">Link paper: </div>
                <a target="_blank" href={card.paperLink}>
                    {card.paperLink}
                </a>
            </div>
            <div className="mb-5">
                <div className="font-bold text-xl">Description: </div>
                <div>{card.description}</div>
            </div>
            <div className="mb-5">
                <div className="font-bold text-xl">Review history: </div>
                {card?.reviews && (
                    <div>
                        {card.reviews.map((review) => (
                            <div className="flex gap-5 my-2 flex items-center">
                                <div
                                    className={`bg-${
                                        review.type === "Accept" ? "green" : "red"
                                    }-400 px-3 py-1 font-bold rounded-md`}
                                >
                                    {review.type}
                                </div>
                                <div>{review.text}</div>
                            </div>
                        ))}
                    </div>
                )}
                {/* <div>{card?.review && card?.reviews.map((review) => <div>{review.text}</div>)}</div> */}
            </div>
            <div>
                <Button type="primary" onClick={() => setFeedBackModalVisible(true)}>
                    Add review
                </Button>
            </div>
            <div>
                <div className="font-bold text-xl">Discussion</div>
                <div className="flex gap-3 mt-3">
                    <img className="w-12 rounded-full" src={user.photoURL} alt="" />
                    <Input
                        value={comment}
                        onKeyDown={handleCommentSubmit}
                        onChange={(e) => setComment(e.target.value)}
                        className="rounded-xl"
                        placeholder="Write a comment..."
                    />
                </div>
                <div>
                    {comments && comments.length > 0 ? (
                        comments.map((comment) => <Comment key={comment.id} comment={comment} />)
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <FeedBackModal
                visible={feedBackModalVisible}
                handleCancel={async (review) => {
                    const newCardsForLane = lane.cards.filter(
                        (cardItem) => cardItem.id !== card.id
                    );
                    const newLanes = board.lanes.map((laneItem, index) => {
                        if (laneItem.id === lane.id) {
                            return {
                                ...laneItem,
                                cards: newCardsForLane,
                            };
                        }

                        if (index === board.lanes.length - 1)
                            return {
                                ...laneItem,
                                cards: [
                                    ...laneItem.cards,
                                    {
                                        ...card,
                                        reviews: Array.isArray(card?.reviews)
                                            ? [...card.reviews, { text: review, type: "Reject" }]
                                            : [{ text: review, type: "Reject" }],
                                    },
                                ],
                            };
                        return laneItem;
                    });
                    await boardService.updateBoard(boardId, { lanes: newLanes });
                    setBoard(prepareBoard({ ...board, lanes: newLanes }));
                    setFeedBackModalVisible(false);
                }}
                handleOk={async (review) => {
                    const newCardsForLane = lane.cards.filter(
                        (cardItem) => cardItem.id !== card.id
                    );
                    const laneIndex = board.lanes.findIndex((laneItem) => laneItem.id === lane.id);
                    const newLanes = board.lanes.map((laneItem, index) => {
                        if (laneItem.id === lane.id) {
                            return {
                                ...laneItem,
                                cards: newCardsForLane,
                            };
                        }

                        if (index === laneIndex + 1)
                            return {
                                ...laneItem,
                                cards: [
                                    ...laneItem.cards,
                                    {
                                        ...card,
                                        reviews: Array.isArray(card?.reviews)
                                            ? [...card.reviews, { text: review, type: "Accept" }]
                                            : [{ text: review, type: "Accept" }],
                                    },
                                ],
                            };
                        return laneItem;
                    });
                    await boardService.updateBoard(boardId, {
                        lanes: newLanes,
                    });
                    setBoard(prepareBoard({ ...board, lanes: newLanes }));
                    setFeedBackModalVisible(false);
                }}
            />
        </Modal>
    );
};

export default CardModal;
