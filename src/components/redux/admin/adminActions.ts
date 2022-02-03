import { GameToEdit } from "@/types";
import { addGameToEditType } from "./adminActionTypes";

export const addGameToEditAction = (value: GameToEdit): { type: string; payload: GameToEdit } => ({
  type: addGameToEditType,
  payload: value,
});
