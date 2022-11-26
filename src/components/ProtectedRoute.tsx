import React, { FC, ReactElement } from 'react';
import { useAppSelector } from 'hooks/typedHooks';
import { Navigate } from 'react-router-dom';
import { authSelector } from 'store/authSlice';
import { Path } from 'constants/routing';

type Props = {
  children: ReactElement;
  redirect: Path;
  isAuthState: boolean;
};

const ProtectedRoute: FC<Props> = ({ children, redirect, isAuthState }) => {
  const { isAuth } = useAppSelector(authSelector);

  if (isAuth === isAuthState) {
    return <Navigate to={redirect} />;
  }

  return children;
};

export default ProtectedRoute;
