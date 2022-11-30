import React, { FC } from 'react';
import { styled, SxProps, Theme } from '@mui/material';

const StyledMain = styled('main')({
  flex: 1,
  paddingTop: '5rem',
  paddingBottom: '1rem',
  backgroundImage: 'url(bg6.jpg)',
  backgroundSize: 'cover',
});

type Props = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const Page: FC<Props> = ({ children, sx }) => {
  return <StyledMain sx={sx}>{children}</StyledMain>;
};

export default Page;
