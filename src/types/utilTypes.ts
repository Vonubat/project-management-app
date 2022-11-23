import React from 'react';
import { Theme } from '@mui/material';
import { StyledComponent } from '@emotion/styled';
import FlipMove from 'react-flip-move';

export type JwtBody = {
  exp: number;
  iat: number;
  id: string;
  login: string;
};

export type LocalStorageUserData = {
  userId: string;
  login: string;
};

export type CustomFlipMove = StyledComponent<
  FlipMove.FlipMoveProps & {
    children?: React.ReactNode;
    theme?: Theme | undefined;
  },
  Record<string, unknown>,
  {
    ref?: React.Ref<FlipMove> | undefined;
  }
>;
