import { FilterStateType, Game } from "@/types";
import { createReducer } from "@reduxjs/toolkit";
import {
  changeSearchAction,
  fetchGamesAction,
  filterByAgeAction,
  filterByGenreAction,
  filterBySelectionAction,
  filterBySelectionDirectionAction,
} from "../actions/filterActions";

interface IFilterAction {
  payload: string;
  type: string;
}

interface IGameAction {
  payload: Game[];
  type: string;
}

export const initialState: FilterStateType = {
  age: "all ages",
  sort: "rating",
  sortDir: "asc",
  genre: "all genres",
  term: "",
  searchResult: [] as Game[],
};
function fetchGames(state: FilterStateType, action: IGameAction) {
  return {
    ...state,
    searchResult: action.payload,
  };
}

function filterBySelection(state: FilterStateType, action: IFilterAction) {
  return {
    ...state,
    sort: action.payload,
  };
}

function filterBySelectionDirection(state: FilterStateType, action: IFilterAction) {
  return {
    ...state,
    sortDir: action.payload,
  };
}

function filterByAge(state: FilterStateType, action: IFilterAction) {
  return {
    ...state,
    age: action.payload,
  };
}

function filterByGenre(state: FilterStateType, action: IFilterAction) {
  return {
    ...state,
    genre: action.payload,
  };
}

function changeSearch(state: FilterStateType, action: IFilterAction) {
  return {
    ...state,
    term: action.payload,
  };
}

export const filterReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchGamesAction.fulfilled, fetchGames);
  builder.addCase(filterBySelectionAction, filterBySelection);
  builder.addCase(filterBySelectionDirectionAction, filterBySelectionDirection);
  builder.addCase(filterByAgeAction, filterByAge);
  builder.addCase(filterByGenreAction, filterByGenre);
  builder.addCase(changeSearchAction, changeSearch);
});

export default filterReducer;
