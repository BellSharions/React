import { FilterAction, Game } from "@/types/types";
import { Dispatch } from "redux";
import {
  fetchGamesRequest,
  fetchGamesSuccess,
  filterByAgeType,
  filterByGenreType,
  filterByPriceAscending,
  filterByPriceDescending,
  filterByRating,
  filterByRatingAscending,
  filterByRatingDescending,
  filterBySelection,
  filterBySelectionDirection,
} from "./filterActionTypes";

export const fetchGamesRequestAction = (): { type: string } => ({
  type: fetchGamesRequest,
});

export const fetchGamesSuccessAction = (games: Game[]): FilterAction => ({
  type: fetchGamesSuccess,
  payload: games,
});

export const fetchGamesAction =
  (partOfUrl: string) =>
  async (dispatch: Dispatch<{ type: string } | FilterAction>): Promise<Game[]> => {
    dispatch(fetchGamesRequestAction());
    const response = await fetch(`http://localhost:8080/games${partOfUrl}`, { method: "GET" });
    const games: Game[] = await response.json();
    dispatch(fetchGamesSuccessAction(games));
    return games;
  };

export const filterByPriceDescendingAction = (): { type: string } => ({
  type: filterByPriceDescending,
});

export const filterByRatingDescendingAction = (): { type: string } => ({
  type: filterByRatingDescending,
});

export const filterByPriceAscendingAction = (): { type: string } => ({
  type: filterByPriceAscending,
});

export const filterByRatingAscendingAction = (): { type: string } => ({
  type: filterByRatingAscending,
});
export const filterBySelectionAction = (select: string): { type: string; payload: string } => ({
  type: filterBySelection,
  payload: select,
});
export const filterBySelectionDirectionAction = (direction: string): { type: string; payload: string } => ({
  type: filterBySelectionDirection,
  payload: direction,
});

export const filterByRatingAction = (): { type: string } => ({
  type: filterByRating,
});
export const filterByAgeAction = (age: string): { type: string; payload: string } => ({
  type: filterByAgeType,
  payload: age,
});
export const filterByGenreAction = (genre: string): { type: string; payload: string } => ({
  type: filterByGenreType,
  payload: genre,
});
