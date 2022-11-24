import { useAppSelector } from 'hooks/hooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { boardListSelector } from 'store/boardListSlice';
import { usersSelector } from 'store/usersSlice';

export default function GetUsersForCurrentBoard() {
  const { users } = useAppSelector(usersSelector);
  const { currentBoardId } = useAppSelector(boardListSelector);
}
