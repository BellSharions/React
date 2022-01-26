import { Game } from "@/types/types";
import { addGameToEditType } from "./adminActionTypes";

export const addGameToEditAction = (value: Game): { type: string; payload: Game } => ({
  type: addGameToEditType,
  payload: value,
});
