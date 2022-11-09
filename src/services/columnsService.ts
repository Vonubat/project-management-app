import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import {
  ColumnData,
  ColumnParams,
  ColumnsSetUpdateParams,
  ColumnsSetCreateParams,
} from 'types/columns';
import api from './api';

export default class ColumnsService {
  static getAllColumns(boardId: string): Promise<AxiosResponse<ColumnData[]>> {
    return api.get(`${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}`);
  }

  static createColumn(boardId: string, data: ColumnParams): Promise<AxiosResponse<ColumnData>> {
    return api.post(`${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}`, data);
  }

  static getColumn(boardId: string, columnId: string): Promise<AxiosResponse<ColumnData>> {
    return api.get(`${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}`);
  }

  static updateColumn(
    boardId: string,
    columnId: string,
    data: ColumnParams
  ): Promise<AxiosResponse<ColumnData>> {
    return api.put(`${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}`, data);
  }

  static deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse<ColumnData>> {
    return api.delete(`${ApiRoutes.boards}/${boardId}${ApiRoutes.columns}/${columnId}`);
  }

  static getColumnsSet(columnIds: string[], userId: string): Promise<AxiosResponse<ColumnData[]>> {
    return api.get(ApiRoutes.columnsSet, {
      params: {
        ids: columnIds.join(','),
        userId,
      },
    });
  }

  static updateColumnsSet(data: ColumnsSetUpdateParams[]): Promise<AxiosResponse<ColumnData[]>> {
    return api.patch(ApiRoutes.columnsSet, data);
  }

  static createColumnsSet(data: ColumnsSetCreateParams[]): Promise<AxiosResponse<ColumnData[]>> {
    return api.post(ApiRoutes.columnsSet, data);
  }
}
