import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BoardsService from 'services/boardsService';
import { usersSelector } from 'store/usersSlice';
import { BoardData } from 'types/boards';
import { UserData } from 'types/users';
import { useAppSelector } from './typedHooks';

export const useUsersForCurrentBoard = (): UserData[] => {
  const { boardId } = useParams();
  const { users } = useAppSelector(usersSelector);
  const [usersForCurrentBoard, setUsersForCurrentBoard] = useState<UserData[]>([]);

  const getUsersForCurrentBoard = useCallback(async (): Promise<void> => {
    const currentBoard: BoardData = (await BoardsService.getBoard(boardId as string)).data;
    const arrOfUserIds: UserData['_id'][] = [currentBoard.owner, ...currentBoard.users];
    const sortedUsers: UserData[] = users.filter((user) =>
      arrOfUserIds.some((userId) => user._id === userId)
    );

    setUsersForCurrentBoard(sortedUsers);
  }, [boardId, users]);

  useEffect(() => {
    getUsersForCurrentBoard();
  }, [getUsersForCurrentBoard]);

  return usersForCurrentBoard;
};
