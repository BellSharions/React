import { AdminStateType, GameToEdit } from "@/types";
import { createReducer } from "@reduxjs/toolkit";
import { addGameToEditAction } from "../actions/adminActions";

interface IAdminAction {
  payload: GameToEdit;
  type: string;
}

export const initialState: AdminStateType = {
  gametoEdit: { id: 0, title: "", category: "", price: 0, imgUrl: "", description: "", genre: "", age: 0, rating: 0 },
};

function addGameToEdit(state: AdminStateType, action: IAdminAction) {
  return {
    ...state,
    gametoEdit: action.payload,
  };
}
export const adminReducer = createReducer(initialState, (builder) => {
  builder.addCase(addGameToEditAction, addGameToEdit);
});
export default adminReducer;
