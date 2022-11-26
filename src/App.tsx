import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Path } from 'constants/routing';
import BoardList from 'pages/BoardList';
import Columns from 'pages/Columns';
import EditProfile from 'pages/EditProfile';
import Home from 'pages/Home';
import PageNotFound from 'pages/PageNotFound';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

import Layout from 'components/Layout';
import ProtectedRoute from 'components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path={Path.signIn}
          element={
            <ProtectedRoute redirect={Path.boards} isAuthState={true}>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.signUp}
          element={
            <ProtectedRoute redirect={Path.boards} isAuthState={true}>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.boards}
          element={
            <ProtectedRoute redirect={Path.home} isAuthState={false}>
              <BoardList />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.columns}
          element={
            <ProtectedRoute redirect={Path.home} isAuthState={false}>
              <Columns />
            </ProtectedRoute>
          }
        />
        <Route
          path={Path.user}
          element={
            <ProtectedRoute redirect={Path.home} isAuthState={false}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route path={Path.any} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
