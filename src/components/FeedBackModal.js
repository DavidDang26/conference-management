import React from "react";
import Modal from "antd/lib/modal/Modal";
import MDEditor from "@uiw/react-md-editor";

const feedBackStructure = [
    {
        criteriaTitle: "1. Title of the paper",
        itemsCheck: [
            {
                text: "Does the title accurately reflect the content of the paper?",
            },
        ],
    },
    {
        criteriaTitle: "2. Abstract",
        itemsCheck: [
            {
                text: "Is the abstract clear and concise?",
            },
            {
                text: "Does the abstract provide a good overview of the paper's key contributions and findings?",
            },
        ],
    },
    {
        criteriaTitle: "3. Introduction",
        itemsCheck: [
            {
                text: "Does the introduction clearly state the problem or research question?",
            },
            {
                text: "Is the significance of the research adequately explained?",
            },
            {
                text: "Are the objectives/hypotheses clearly defined?",
            },
        ],
    },
];

const FeedBackModal = ({ visible, handleOk, handleCancel }) => {
    return (
        <Modal
            className="w-3/4"
            title="Form review paper"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Accept"
            cancelText="Reject"
            okButtonProps={{
                style: {
                    backgroundColor: "green", // Set your desired color here
                    borderColor: "green", // Set border color if needed
                    color: "white", // Set text color
                    fontWeight: "bold",
                },
            }}
            cancelButtonProps={{
                style: {
                    backgroundColor: "red", // Set your desired color here
                    borderColor: "red", // Set border color if needed
                    color: "white", // Set text color
                    fontWeight: "bold",
                },
            }}
        >
            <form>
                <div className="text-md italic">
                    Please follow our criteria for a good paper review
                </div>
                <div className="my-5">
                    {feedBackStructure.map((criteria) => (
                        <div>
                            <div className="text-bold my-2">{criteria.criteriaTitle}</div>
                            <div>
                                {criteria.itemsCheck.map((item) => (
                                    <div className="flex items-center my-1">
                                        <input
                                            id="checkbox-1"
                                            type="checkbox"
                                            value=""
                                            className="mr-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="checkbox-1"
                                            for="checkbox-1"
                                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                        >
                                            {item.text}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </form>
            <div className="container mt-5 mb-5">
                <MDEditor value="Input your paper review here" />
                {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
            </div>
        </Modal>
    );
};

export default FeedBackModal;
