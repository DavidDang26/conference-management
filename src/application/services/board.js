import { db } from './firebase';
import { getUser } from './auth';

const userBoards = () => db.ref('conferences');

const userBoard = (board) => userBoards().child(board);

const getBoard = (key) => userBoard(key).once('value');

const addBoard = (board) => {
    userBoards().push(board);
};

const deleteBoard = (key) => userBoard(key).remove();

const updateBoard = (key, data) => userBoard(key).update(data);

export const boardService = {
    userBoards,
    getBoard,
    addBoard,
    deleteBoard,
    updateBoard,
};
