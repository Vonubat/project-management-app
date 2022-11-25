import { SocketAction } from 'constants/constants';
import { authSelector } from 'store/authSlice';
import { getBoardsByUser } from 'store/boardListSlice';
import { showNotification } from 'store/notificationSlice';
import { getAllUsers, usersSelector } from 'store/usersSlice';
import { BoardsContentSocketPayload, UsersSocketPayload } from 'types/socket';
import { useAppDispatch, useAppSelector } from './hooks';

type SocketReducerParams = {
  action: SocketAction;
  payload: BoardsContentSocketPayload;
};

type UserEventReducerParams = {
  action: SocketAction;
  payload: UsersSocketPayload;
};

const useSocketReducer = () => {
  const { users } = useAppSelector(usersSelector);
  const { userId } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  const boardsEventReducer = ({
    action,
    payload: { users: usersIds, initUser },
  }: SocketReducerParams) => {
    if (initUser === userId || !usersIds.includes(userId)) return;

    const initUserName = users.find((u) => u._id === initUser)?.name || 'Someone';

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: `${initUserName} just create a new board` }));
        dispatch(getBoardsByUser());
        break;
      case SocketAction.delete:
        dispatch(showNotification({ message: `${initUserName} just delete the board` }));
        dispatch(getBoardsByUser());
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: `${initUserName} just updated the board` }));
        dispatch(getBoardsByUser());
        break;
      default:
        break;
    }
  };

  const usersEventReducer = ({
    action,
    payload: {
      ids: [initUser],
    },
  }: UserEventReducerParams) => {
    console.log(initUser);

    if (initUser === userId) return;

    dispatch(getAllUsers());
    console.log('dispatch');

    switch (action) {
      case SocketAction.add:
        dispatch(showNotification({ message: 'New user just joined the app' }));
        break;
      case SocketAction.update:
        dispatch(showNotification({ message: 'Some user just edit profile' }));
        break;
      case SocketAction.delete:
        //TODO add board deletion if user deleted
        dispatch(showNotification({ message: 'Some user just deleted profile' }));
        break;
      default:
        break;
    }
  };

  return { boardsEventReducer, usersEventReducer };
};

export default useSocketReducer;
