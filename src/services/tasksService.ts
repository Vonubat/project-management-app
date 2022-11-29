import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { TaskData, TaskParamsCreate, TaskParamsUpdate, UpdateTaskSetData } from 'types/tasks';

import api from './api';

export default class TasksService {
  //TODO remove this method if no needed
  static getAllTasks(boardId: string, columnId: string): Promise<AxiosResponse<TaskData[]>> {
    return api.get(
      `${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}${ApiRoutes.tasks}`
    );
  }

  static createTask(
    boardId: string,
    columnId: string,
    data: TaskParamsCreate
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
    data: TaskParamsUpdate
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

  static updateTaskSet(data: UpdateTaskSetData): Promise<AxiosResponse<TaskData[]>> {
    return api.patch(ApiRoutes.tasksSet, data);
  }

  static getTaskSetByBoardId(boardId: string): Promise<AxiosResponse<TaskData[]>> {
    return api.get(`${ApiRoutes.tasksSet}/${boardId}`);
  }
}
