import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { cyan, lightGreen, orange, pink, red, teal } from '@mui/material/colors';
import ScrollToTop from 'utils/ScrollToTop';

import './i18n';

import { store } from './store/store';
import App from './App';

import './index.scss';

let theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: pink[600],
    },
    error: {
      main: red[600],
    },
    warning: {
      main: orange[700],
    },
    info: {
      main: cyan[500],
    },
    success: {
      main: lightGreen[500],
    },
  },
});

theme = responsiveFontSizes(theme);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
