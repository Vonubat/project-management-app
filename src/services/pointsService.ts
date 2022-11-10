import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { ColumnData } from 'types/columns';
import { PointsData, PointsParams, PointsSetParams, PointUpdateParams } from 'types/points';
import api from './api';

export default class PointsService {
  static getPointsByParams(
    pointIds?: string[],
    userId?: string
  ): Promise<AxiosResponse<PointsData[]>> {
    return api.get(ApiRoutes.points, {
      params: {
        ids: pointIds?.join(','),
        userId,
      },
    });
  }

  static createPoint(data: PointsParams): Promise<AxiosResponse<PointsData>> {
    return api.post(ApiRoutes.points, data);
  }

  static updatePointsSet(data: PointsSetParams): Promise<AxiosResponse<PointsData[]>> {
    return api.patch(ApiRoutes.points, data);
  }

  static getPointsByTaskId(taskId: string): Promise<AxiosResponse<PointsData[]>> {
    return api.get(`${ApiRoutes.points}/${taskId}`);
  }

  static updatePoint(pointId: string, data: PointUpdateParams): Promise<AxiosResponse<ColumnData>> {
    return api.patch(`${ApiRoutes.points}/${pointId}`, data);
  }

  static deletePoint(pointId: string): Promise<AxiosResponse<PointsData>> {
    return api.delete(`${ApiRoutes.points}/${pointId}`);
  }
}
