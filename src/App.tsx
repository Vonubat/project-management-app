import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { Path } from 'constants/routing';
import BoardList from 'pages/BoardList';
import ProtectedRoute from 'components/ProtectedRoute';
import EditProfile from 'pages/EditProfile';

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
          path={Path.user}
          element={
            <ProtectedRoute redirect={Path.home} isAuthState={false}>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
