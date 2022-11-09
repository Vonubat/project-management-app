import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { TaskData, TaskParams } from 'types/tasks';
import api from './api';

export default class TasksService {
  static getAllTasks(boardId: string, columnId: string): Promise<AxiosResponse<TaskData[]>> {
    return api.get(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}`
    );
  }

  static createTask(
    boardId: string,
    columnId: string,
    data: TaskParams
  ): Promise<AxiosResponse<TaskData>> {
    return api.post(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}`,
      data
    );
  }

  static getTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse<TaskData>> {
    return api.get(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}/${taskId}`
    );
  }

  static updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    data: TaskParams
  ): Promise<AxiosResponse<TaskData>> {
    return api.put(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}/${taskId}`,
      data
    );
  }

  static deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse<TaskData>> {
    return api.delete(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}/${taskId}`
    );
  }
}
