import { FilterStateType, Game } from "@/types/types";
import {
  changeSearchType,
  fetchGamesSuccess,
  filterByAgeType,
  filterByGenreType,
  filterBySelection,
  filterBySelectionDirection,
} from "./filterActionTypes";

export const initialState: FilterStateType = {
  age: "all ages",
  sort: "rating",
  sortDir: "asc",
  genre: "all genres",
  term: "",
  searchResult: [] as Game[],
};

const filterReducer = (state = initialState, action: { type: string; payload: string | Game[] }): FilterStateType => {
  switch (action.type) {
    case filterBySelection:
      return {
        ...state,
        sort: action.payload as string,
      };
    case filterBySelectionDirection:
      return {
        ...state,
        sortDir: action.payload as string,
      };
    case filterByAgeType:
      return {
        ...state,
        age: action.payload as string,
      };
    case filterByGenreType:
      return {
        ...state,
        genre: action.payload as string,
      };
    case fetchGamesSuccess:
      return {
        ...state,
        searchResult: action.payload as Game[],
      };
    case changeSearchType:
      return {
        ...state,
        term: action.payload as string,
      };
    default:
      return state;
  }
};
export default filterReducer;
