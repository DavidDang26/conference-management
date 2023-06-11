import React from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
    const { commenter } = comment;
    return (
        <div className="my-3 flex gap-5 items-center">
            <img
                src={commenter?.photoURL || ''}
                alt="commenter-img"
                className="w-12 rounded-full h-12"
            />
            <div className="shadow-sm w-full px-2 py-2 border-2 rounded-md">
                <div className="flex gap-3 justify-start">
                    <div className="font-bold">{commenter?.displayName || ''}</div>
                    <div>
                        {comment.createdAt
                            ? moment(comment.createdAt).format('DD/MM/yyyy, hh:mm:ss')
                            : ''}
                    </div>
                </div>
                <div>{comment.content}</div>
            </div>
        </div>
    );
};

export default Comment;
