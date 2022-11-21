import { isAsyncThunkAction, isPending } from '@reduxjs/toolkit';
import { signIn, signUp } from './authSlice';
import {
  createBoard,
  deleteBoard,
  getAllUsers,
  getBoardsByUser,
  updateBoard,
} from './boardListSlice';
import {
  changeColumnOrder,
  createColumn,
  deleteColumn,
  getColumnsInBoards,
  updateColumn,
} from './columnsSlice';
import { changeTaskOrder, createTask, deleteTask, getAllTasks, updateTask } from './tasksSlice';
import { deleteUser, getUser, updateUser } from './usersSlice';

export const isGetAction = isAsyncThunkAction(
  getBoardsByUser,
  getColumnsInBoards,
  getAllTasks,
  getAllUsers,
  getUser,
  signIn,
  signUp
);

export const isNoNotificationAction = isAsyncThunkAction(
  getBoardsByUser,
  getColumnsInBoards,
  getAllTasks,
  getAllUsers,
  getUser,
  changeColumnOrder,
  changeTaskOrder
);

export const isInfoAction = isAsyncThunkAction(
  signIn,
  signUp,
  deleteBoard,
  deleteUser,
  deleteColumn,
  deleteTask
);

export const isSuccessAction = isAsyncThunkAction(
  createBoard,
  createColumn,
  createTask,
  updateBoard,
  updateColumn,
  updateTask,
  updateUser
);
