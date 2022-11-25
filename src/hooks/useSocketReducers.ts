import { SocketAction } from 'constants/constants';
import { Path } from 'constants/routing';
import { useNavigate } from 'react-router-dom';
import { authSelector } from 'store/authSlice';
import { getBoardsByUser } from 'store/boardListSlice';
import { deleteLocalColumn, getColumnsInBoards } from 'store/columnsSlice';
import { showNotification } from 'store/notificationSlice';
import { deleteLocalTaskById, getTasksByBoardId } from 'store/tasksSlice';
import { getAllUsers } from 'store/usersSlice';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';
import { UserData } from 'types/users';
import { useAppDispatch, useAppSelector } from './hooks';

type BoardsEventReducerParam = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  users: UserData[];
  boardId?: string;
};

type ColumnsEventReducerParams = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  users: UserData[];
  boardId: string;
};

type TasksEventReducerParams = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  users: UserData[];
  boardId: string;
};

type UsersEventReducerParams = {
  action: SocketAction;
  payload: Omit<UsersSocketPayload, 'action'>;
  boardId?: string;
};

const useSocketReducers = () => {
  const { userId } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const boardsEventReducer = ({ action, payload, users, boardId }: BoardsEventReducerParam) => {
    const { users: usersIds, initUser } = payload;

    if (initUser === userId || !usersIds.includes(userId)) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || 'Someone';

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} just create a new board` }));
        break;
      case SocketAction.delete:
        boardId && navigate(Path.boards);
        dispatch(showNotification({ message: `${initUserName} just delete a board` }));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} just updated a board` }));
        break;
      default:
        break;
    }

    dispatch(getBoardsByUser());
  };

  const tasksEventReducer = ({ action, payload, users, boardId }: TasksEventReducerParams) => {
    const { users: usersIds, initUser, ids } = payload;

    if (initUser === userId || !usersIds.includes(userId) || !boardId) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || 'Someone';

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} just add a new task` }));
        dispatch(getColumnsInBoards(boardId));
        dispatch(getTasksByBoardId(boardId));
        break;
      case SocketAction.delete:
        dispatch(showNotification({ message: `${initUserName} just delete a task` }));
        dispatch(deleteLocalTaskById(ids[0]));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} just updated a task` }));
        dispatch(getColumnsInBoards(boardId));
        dispatch(getTasksByBoardId(boardId));
        break;
      default:
        break;
    }
  };

  const columnsEventReducer = ({ action, payload, users, boardId }: ColumnsEventReducerParams) => {
    const { users: usersIds, initUser, ids } = payload;

    if (initUser === userId || !usersIds.includes(userId) || !boardId) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || 'Someone';

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} just add a new column` }));
        dispatch(getColumnsInBoards(boardId));
        break;
      case SocketAction.delete:
        dispatch(showNotification({ message: `${initUserName} just delete a column` }));
        dispatch(deleteLocalColumn(ids[0]));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} just updated new column` }));
        dispatch(getColumnsInBoards(boardId));
        break;
      default:
        break;
    }
  };

  const usersEventReducer = ({ action, payload, boardId }: UsersEventReducerParams) => {
    const {
      ids: [initUser],
    } = payload;

    if (initUser === userId || !boardId) return;

    dispatch(getAllUsers());

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: 'New user just joined the app' }));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: 'Some user just edit profile' }));
        break;
      case SocketAction.delete:
        boardId && dispatch(getTasksByBoardId(boardId));
        dispatch(showNotification({ message: 'Some user just deleted profile' }));
        break;
      default:
        break;
    }
  };

  return { boardsEventReducer, usersEventReducer, tasksEventReducer, columnsEventReducer };
};

export default useSocketReducers;
