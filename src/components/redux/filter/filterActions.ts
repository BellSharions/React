import { FilterAction, Game } from "@/types/types";
import { Dispatch } from "redux";
import {
  changeSearchType,
  filterByAgeType,
  filterByGenreType,
  filterBySelection,
  filterBySelectionDirection,
} from "./filterActionTypes";

export const fetchGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<{ type: string } | FilterAction>): Promise<Game[]> => {
    const response = await fetch(`http://localhost:8080/games${partOfUrl}`, { method: "GET" });
    const games: Game[] = await response.json();
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
