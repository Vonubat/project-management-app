import React from 'react';
import FlipMove from 'react-flip-move';
import { StyledComponent } from '@emotion/styled';
import { Theme } from '@mui/material';

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
