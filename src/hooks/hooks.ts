import { useEffect, useState, useRef, useCallback } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import BoardsService from 'services/boardsService';
import { getBoardsByUser, setCurrentBoard } from 'store/boardListSlice';
import { getColumnsInBoards } from 'store/columnsSlice';
import { getTasksByBoardId } from 'store/tasksSlice';
import { usersSelector, getAllUsers } from 'store/usersSlice';
import { BoardData } from 'types/boards';
import { UserData } from 'types/users';
import type { RootState, AppDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useImperativeDisableScroll = (): void => {
  const body = document.body;

  useEffect(() => {
    if (!body) {
      return;
    }

    body.style.overflowY = 'hidden';

    return () => {
      body.style.overflowY = 'scroll';
    };
  }, [body]);
};

type THook<T extends HTMLElement> = [React.RefObject<T>, boolean];

export const useMouseHover = <T extends HTMLElement>(): THook<T> => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleMouseOver = (): void => setHovered(true);
    const handleMouseOut = (): void => setHovered(false);
    const node = ref && ref.current;

    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref]);

  return [ref, hovered];
};

export const useColumnsInitialData = (): void => {
  const { boardId } = useParams();
  const { users } = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (boardId) {
      dispatch(setCurrentBoard(boardId));
      dispatch(getColumnsInBoards(boardId));
      dispatch(getTasksByBoardId(boardId));
      if (!users.length) {
        dispatch(getAllUsers());
      }
    }
  }, [dispatch, boardId, users.length]);
};

export const useBoardListInitialData = (): void => {
  const { users } = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUser());
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);
};

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
