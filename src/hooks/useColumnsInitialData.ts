import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StatusCode } from 'constants/constants';
import { Path } from 'constants/routing';
import { setCurrentBoard } from 'store/boardListSlice';
import { getColumnsInBoards } from 'store/columnsSlice';
import { getTasksByBoardId } from 'store/tasksSlice';
import { getAllUsers, usersSelector } from 'store/usersSlice';
import { useAppDispatch, useAppSelector } from './typedHooks';

export const useColumnsInitialData = (): void => {
  const { boardId } = useParams();
  const { users } = useAppSelector(usersSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const getColumns = useCallback(
    async (boardId: string) => {
      try {
        await dispatch(getColumnsInBoards(boardId)).unwrap();
      } catch (rejectedValue) {
        if (rejectedValue === StatusCode.badRequest || rejectedValue === StatusCode.notFound) {
          navigate(Path.boards);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [boardId, dispatch]
  );

  useEffect(() => {
    if (boardId) {
      dispatch(setCurrentBoard(boardId));
      getColumns(boardId);
      dispatch(getTasksByBoardId(boardId));
      if (!users.length) {
        dispatch(getAllUsers());
      }
    }
  }, [dispatch, boardId, users.length, getColumns]);
};
