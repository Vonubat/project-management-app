import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SocketAction } from 'constants/constants';
import { Path } from 'constants/routing';
import { authSelector } from 'store/authSlice';
import { boardListSelector, getBoardsByUser } from 'store/boardListSlice';
import { deleteLocalColumn, getColumnsInBoards } from 'store/columnsSlice';
import { showNotification } from 'store/notificationSlice';
import { deleteLocalTaskById, getTasksByBoardId } from 'store/tasksSlice';
import { getAllUsers, usersSelector } from 'store/usersSlice';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';

import { useAppDispatch, useAppSelector } from './typedHooks';

type BoardsEventReducerParam = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  boardId?: string;
};

type ColumnsEventReducerParams = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  boardId: string;
};

type TasksEventReducerParams = {
  action: SocketAction;
  payload: Omit<BoardsContentSocketPayload, 'action'>;
  boardId: string;
};

type UsersEventReducerParams = {
  action: SocketAction;
  payload: Omit<UsersSocketPayload, 'action'>;
  boardId?: string;
};

const useSocketReducers = () => {
  const { userId } = useAppSelector(authSelector);
  const { users } = useAppSelector(usersSelector);
  const { boards } = useAppSelector(boardListSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'socketEvent' });

  const boardsEventReducer = ({ action, payload, boardId }: BoardsEventReducerParam) => {
    const { users: usersIds, initUser } = payload;

    if (initUser === userId || !usersIds.includes(userId)) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || t('someone');

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} ${t('createBoard')}` }));
        break;
      case SocketAction.delete:
        boardId && navigate(Path.boards);
        dispatch(showNotification({ message: `${initUserName} ${t('deleteBoard')}` }));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} ${t('updateBoard')}` }));
        break;
      default:
        break;
    }

    dispatch(getBoardsByUser());
  };

  const tasksEventReducer = ({ action, payload, boardId }: TasksEventReducerParams) => {
    const { users: usersIds, initUser, ids } = payload;

    if (initUser === userId || !usersIds.includes(userId) || !boardId) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || t('someone');

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} ${t('createTask')}` }));
        dispatch(getColumnsInBoards(boardId));
        dispatch(getTasksByBoardId(boardId));
        break;
      case SocketAction.delete:
        dispatch(showNotification({ message: `${initUserName} ${t('deleteTask')}` }));
        dispatch(deleteLocalTaskById(ids[0]));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} ${t('updateTask')}` }));
        dispatch(getColumnsInBoards(boardId));
        dispatch(getTasksByBoardId(boardId));
        break;
      default:
        break;
    }
  };

  const columnsEventReducer = ({ action, payload, boardId }: ColumnsEventReducerParams) => {
    const { users: usersIds, initUser, ids } = payload;

    if (initUser === userId || !usersIds.includes(userId) || !boardId) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || t('someone');

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} ${t('createColumn')}` }));
        dispatch(getColumnsInBoards(boardId));
        break;
      case SocketAction.delete:
        dispatch(showNotification({ message: `${initUserName} ${t('deleteColumn')}` }));
        dispatch(deleteLocalColumn(ids[0]));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} ${t('updateColumn')}` }));
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

    if (initUser === userId) return;

    const isInitUserCollaborator = boards
      .reduce((acc, board) => {
        [board.owner, ...board.users].forEach((id) => acc.add(id));
        return acc;
      }, new Set<string>())
      .has(initUser);

    const initUsersBoards = boards.filter((b) => b.owner === initUser).map((b) => b._id);

    dispatch(getAllUsers())
      .unwrap()
      .then((payload) => {
        const initUserData = payload.find((u) => u._id === initUser);
        const initUserName = initUserData?.name || t('someone');

        switch (action) {
          case SocketAction.add:
            dispatch(showNotification({ message: `${initUserName} ${t('createAccount')}` }));
            break;
          case SocketAction.update:
            if (!isInitUserCollaborator) break;
            dispatch(showNotification({ message: `${initUserName} ${t('updateAccount')}` }));
            break;
          case SocketAction.delete:
            if (!isInitUserCollaborator) break;

            if (boardId && initUsersBoards.includes(boardId)) {
              navigate(Path.boards);
            } else if (boardId) {
              dispatch(getTasksByBoardId(boardId));
            }

            dispatch(showNotification({ message: `${initUserName} ${t('deleteAccount')}` }));
            break;
          default:
            break;
        }
      });
  };

  return { boardsEventReducer, usersEventReducer, tasksEventReducer, columnsEventReducer };
};

export default useSocketReducers;
