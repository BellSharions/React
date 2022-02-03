import apiCall from "@/apiCall";
import { CallType, fetchGameQueryLink } from "@/constants";
import { Game } from "@/types";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const enum FilterActions {
  FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS",
  FETCH_GAMES = "FETCH_GAMES",
  FILTER_BY_SELECTION = "FILTER_BY_SELECTION",
  FILTER_BY_SELECTION_DIRECTION = "FILTER_BY_SELECTION_DIRECTION",
  FILTER_BY_AGE = "FILTER_BY_AGE",
  FILTER_BY_GENRE = "FILTER_BY_GENRE",
  CHANGE_SEARCH = "CHANGE_SEARCH",
}

export const filterBySelectionAction = createAction<string>(FilterActions.FILTER_BY_SELECTION);
export const filterBySelectionDirectionAction = createAction<string>(FilterActions.FILTER_BY_SELECTION_DIRECTION);
export const filterByAgeAction = createAction<string>(FilterActions.FILTER_BY_AGE);
export const filterByGenreAction = createAction<string>(FilterActions.FILTER_BY_GENRE);
export const changeSearchAction = createAction<string>(FilterActions.CHANGE_SEARCH);
export const fetchGamesAction = createAsyncThunk(FilterActions.FETCH_GAMES, async (partOfUrl: string) => {
  const getResponse = await apiCall(`${fetchGameQueryLink}${partOfUrl}`, CallType.GET, null);
  const games: Game[] = getResponse.data as Game[];
  return games;
});
