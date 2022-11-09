import React, { FC } from 'react';
import { styled } from '@mui/material';

const StyledMain = styled('main')({
  flex: 1,
  marginTop: '5rem',
  marginBottom: '1rem',
});

type Props = {
  children?: React.ReactNode;
};

const Page: FC<Props> = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Page;
