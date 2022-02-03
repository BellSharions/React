import { AdminStateType, GameToEdit } from "@/types";
import { addGameToEditType } from "./adminActionTypes";

export const initialState: AdminStateType = {
  gametoEdit: { id: 0, title: "", category: "", price: 0, imgUrl: "", description: "", genre: "", age: 0, rating: 0 },
};

const adminReducer = (state = initialState, action: { type: string; payload: GameToEdit }): AdminStateType => {
  switch (action.type) {
    case addGameToEditType:
      return {
        ...state,
        gametoEdit: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
