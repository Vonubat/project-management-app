import { AxiosResponse } from 'axios';
import { ApiRoutes } from 'constants/constants';
import { BoardData, BoardParams } from 'types/boards';
import api from './api';

export default class BoardsService {
  static getAllBoards(): Promise<AxiosResponse<BoardData[]>> {
    return api.get(ApiRoutes.boards);
  }

  static createBoard(data: BoardParams): Promise<AxiosResponse<BoardData>> {
    return api.post(ApiRoutes.boards, data);
  }

  static getBoard(boardId: string): Promise<AxiosResponse<BoardData>> {
    return api.get(`${ApiRoutes.boards}/${boardId}`);
  }

  static updateBoard(boardId: string, data: BoardParams): Promise<AxiosResponse<BoardData>> {
    return api.put(`${ApiRoutes.boards}/${boardId}`, data);
  }

  static deleteBoard(boardId: string): Promise<AxiosResponse<BoardData>> {
    return api.delete(`${ApiRoutes.boards}/${boardId}`);
  }

  static getListOfBoards(boardIds: string[]): Promise<AxiosResponse<BoardData[]>> {
    return api.get(ApiRoutes.boardsSet, {
      params: {
        ids: boardIds.join(','),
      },
    });
  }
  static getUserBoards(userId: string): Promise<AxiosResponse<BoardData[]>> {
    return api.get(`${ApiRoutes.boardsSet}/${userId}`);
  }
}
