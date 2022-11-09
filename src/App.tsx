import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import Home from 'pages/Home';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import { Path } from 'constants/routing';
import Boards from 'pages/Boards';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={Path.signIn} element={<SignIn />} />
        <Route path={Path.signUp} element={<SignUp />} />
        <Route path={Path.boards} element={<Boards />} />
      </Route>
    </Routes>
  );
}

export default App;
