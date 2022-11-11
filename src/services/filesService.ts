import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { FileData } from 'types/file';
import api from './api';

export default class FilesService {
  static getFilesByParams(
    columnIds?: string[],
    userId?: string,
    taskId?: string
  ): Promise<AxiosResponse<FileData[]>> {
    return api.get(`${ApiRoutes.file}`, {
      params: {
        ids: columnIds?.join(','),
        userId,
        taskId,
      },
    });
  }

  // can't upload file (empty object)
  /*  static uploadFile(
    boardId: string,
    taskId: string,
    file: File
  ): Promise<AxiosResponse<FileData[]>> {
    const formData = new FormData();
    formData.append(`${file.name}`, file);
    console.log(file);

    return api.post(
      `${ApiRoutes.file}`,
      { boardId, taskId, file: formData },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } */

  static getFilesByBoardId(boardId: string): Promise<AxiosResponse<FileData[]>> {
    return api.get(`${ApiRoutes.file}/${boardId}`);
  }

  static deleteFile(fileId: string): Promise<AxiosResponse<FileData>> {
    return api.delete(`${ApiRoutes.file}/${fileId}`);
  }
}
