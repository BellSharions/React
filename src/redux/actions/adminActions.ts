import { GameToEdit } from "@/types";
import { createAction } from "@reduxjs/toolkit";

export const enum AdminActions {
  ADD_GAME_TO_EDIT = "ADD_GAME_TO_EDIT",
}

export const addGameToEditAction = createAction<GameToEdit>(AdminActions.ADD_GAME_TO_EDIT);
