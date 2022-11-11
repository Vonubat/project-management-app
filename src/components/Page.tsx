import React, { FC } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  styled,
  SxProps,
  Theme,
  ThemeProvider,
} from '@mui/material';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const StyledMain = styled('main')({
  flex: 1,
  marginTop: '5rem',
  marginBottom: '1rem',
});

type Props = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const Page: FC<Props> = ({ children, sx }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledMain sx={sx}>{children}</StyledMain>
    </ThemeProvider>
  );
};

export default Page;
