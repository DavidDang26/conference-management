import React, { useState } from "react";
import Modal from "antd/lib/modal/Modal";
import { Input } from "antd";
import { v4 as uuid } from "uuid";
import { convertUser } from "../utils/convertFromRaw";
import moment from "moment";
import Comment from "./Comment";
import FeedBackModal from "./FeedBackModal";
import { Button } from "antd";

const CardModal = ({ card, closeModal, visible, addComment, user }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(card.comments);
    const [feedBackModalVisible, setFeedBackModalVisible] = useState(false);

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
            width="1000px"
        >
            <div>
                <Button type="primary" onClick={() => setFeedBackModalVisible(true)}>
                    Add review
                </Button>
            </div>
            <div className="mb-5">
                <div className="font-bold text-xl">Link paper: </div>
                <a target="_blank" href={card.paperLink}>
                    {card.paperLink}
                </a>
            </div>
            <div className="mb-5">
                <div className="font-bold text-xl">Description: </div>
                <div>{card.description}</div>
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
                handleCancel={() => setFeedBackModalVisible(false)}
                handleOk={() => setFeedBackModalVisible(false)}
            />
        </Modal>
    );
};

export default CardModal;
