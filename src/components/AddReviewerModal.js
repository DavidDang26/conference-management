import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { adminService } from "../data/user";
import { objectToArray } from "../utils";
import { Select } from "antd";
import { boardService } from "../data";

const AddReviewerModal = ({ visible, closeModal, board }) => {
    const [users, setUsers] = useState([]);
    const [reviewer, setReviewer] = useState(null);

    useEffect(() => {
        (async () => {
            await fetchUsers();
        })();
    }, []);

    const fetchUsers = async () => {
        await adminService.admins().on("value", (snapshot) => {
            if (!snapshot) return;
            const userList = objectToArray(snapshot.val() || {});
            setUsers(userList);
            setReviewer(userList[0]);
        });
    };

    const handleSelectReviewer = (id) => {
        setReviewer(users.find((user) => user.id === id));
    };

    const handleAddReviewer = async () => {
        await boardService.addReviewer(board.key, reviewer);
    };

    return (
        <Modal
            visible={visible}
            onCancel={closeModal}
            title="Add reviewer for the conference"
            onOk={handleAddReviewer}
        >
            <Select
                className="w-full"
                value={reviewer && reviewer?.id ? reviewer.id : users[0]?.id}
                style={{ width: 120 }}
                onChange={handleSelectReviewer}
                options={users.map((user) => ({
                    value: user.id,
                    label: user.displayName,
                }))}
            />
        </Modal>
    );
};

export default AddReviewerModal;
