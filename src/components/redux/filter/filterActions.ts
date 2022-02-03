import { FilterAction, Game } from "@/types";
import { Dispatch } from "redux";
import {
  changeSearchType,
  fetchGamesSuccess,
  filterByAgeType,
  filterByGenreType,
  filterBySelection,
  filterBySelectionDirection,
} from "./filterActionTypes";

export const fetchGamesSuccessAction = (games: Game[]): FilterAction => ({
  type: fetchGamesSuccess,
  payload: games,
});
export const fetchGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<{ type: string } | FilterAction>): Promise<Game[]> => {
    const response = await fetch(`http://localhost:8080/api/search?${partOfUrl}`, { method: "GET" });
    const games: Game[] = await response.json();
    dispatch(fetchGamesSuccessAction(games));
    return games;
  };
export const filterBySelectionAction = (select: string): { type: string; payload: string } => ({
  type: filterBySelection,
  payload: select,
});
export const filterBySelectionDirectionAction = (direction: string): { type: string; payload: string } => ({
  type: filterBySelectionDirection,
  payload: direction,
});
export const filterByAgeAction = (age: string): { type: string; payload: string } => ({
  type: filterByAgeType,
  payload: age,
});
export const filterByGenreAction = (genre: string): { type: string; payload: string } => ({
  type: filterByGenreType,
  payload: genre,
});
export const changeSearchAction = (term: string): { type: string; payload: string } => ({
  type: changeSearchType,
  payload: term,
});
