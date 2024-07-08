import { z } from "zod";

import { api } from "@/api/api";
import { ResponseObject } from "@/types/responseType";
import { Board, Column } from "@/types/board";

import { createBoardSchema } from "./validation/createBoardSchema";
import { updateBoardSchema } from "./validation/updateBoardSchema";
import { addColumnToBoardSchema } from "./validation/addColumnToBoardSchema";
import { updateColumnSchema } from "./validation/updateColumnSchema";
import { swapColumnsSchema } from "./validation/swapColumnsSchema";
import { deleteColumnSchema } from "./validation/removeColumnSchema";

export const createBoard = async (data: z.infer<typeof createBoardSchema>) =>
  (await api.post<ResponseObject<Board>>("/v1/boards", data)).data;

export const getLoggedUserBoards = async () =>
  (await api.get<ResponseObject<Board[]>>("/v1/boards/getMyBoards")).data;

export const getBoardById = async (id: string) =>
  (await api.get<ResponseObject<Board>>(`/v1/boards/${id}`)).data;

export const updateBoard = async (
  boardId: String,
  data: z.infer<typeof updateBoardSchema>
) => (await api.put<ResponseObject<Board>>(`/v1/boards/${boardId}`, data)).data;

export const deleteBoardById = async (id: string) =>
  (await api.delete<ResponseObject>(`/v1/boards/${id}`)).data;

export const addColumnToBoard = async (
  id: string,
  data: z.infer<typeof addColumnToBoardSchema>
) =>
  (await api.post<ResponseObject<Column>>(`/v1/boards/${id}/addColumn`, data))
    .data;

export const updateColumn = async (
  id: string,
  data: z.infer<typeof updateColumnSchema>
) =>
  (await api.put<ResponseObject<Column>>(`/v1/boards/${id}/updateColumn`, data))
    .data;

export const swapColumns = async (
  id: string,
  data: z.infer<typeof swapColumnsSchema>
) =>
  (
    await api.put<ResponseObject<{ columnId1: string; columnId2: string }>>(
      `/v1/boards/${id}/swapColumns`,
      data
    )
  ).data;

export const removeColumn = async (
  id: string,
  data: z.infer<typeof deleteColumnSchema>
) =>
  (
    await api.delete<ResponseObject<Column[]>>(
      `/v1/boards/${id}/removeColumn`,
      { data }
    )
  ).data;
