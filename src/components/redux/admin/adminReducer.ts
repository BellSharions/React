import { Game } from "@/types/types";
import { addGameToEditType } from "./adminActionTypes";

export const initialState = {
  gametoEdit: { title: "", category: "", price: 0, imgUrl: "", description: "", genre: "", age: 0, rating: 0 },
};

export const adminReducer = (
  state = initialState,
  action: { type: string; payload: Game }
): {
  gametoEdit: Game;
} => {
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
