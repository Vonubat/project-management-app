import { useEffect } from 'react';
import { getBoardsByUser } from 'store/boardListSlice';
import { getAllUsers, usersSelector } from 'store/usersSlice';
import { useAppDispatch, useAppSelector } from './typedHooks';

export const useBoardListInitialData = (): void => {
  const { users } = useAppSelector(usersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsByUser());
  }, [dispatch]);

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);
};
