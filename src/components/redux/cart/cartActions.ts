import {
  addGameToCart,
  changeGameCheck,
  removeGameFromCart,
  changeGameAmount,
  buyGames,
  increaseTotalAmount,
  decreaseTotalAmount,
  setCartGames,
} from "./cartActionTypes";
import { GameCart, CartAction } from "../../../types/types";

export const addGameToCartAction = (game: GameCart): CartAction => ({
  type: addGameToCart,
  payload: game,
});
export const setCartGamesAction = (game: GameCart[]): CartAction => ({
  type: setCartGames,
  payload: game,
});
export const changeGameCheckAction = (game: Array<GameCart>): { type: string; payload: GameCart[] } => ({
  type: changeGameCheck,
  payload: game,
});

export const changeGameAmountAction = (game: Array<GameCart>): { type: string; payload: GameCart[] } => ({
  type: changeGameAmount,
  payload: game,
});

export const removeGameFromCartAction = (): { type: string } => ({
  type: removeGameFromCart,
});

export const IncreaseTotalAmountAction = (totalAmount: number): { type: string; payload: number } => ({
  type: increaseTotalAmount,
  payload: totalAmount,
});
export const DecreaseTotalAmountAction = (totalAmount: number): { type: string; payload: number } => ({
  type: decreaseTotalAmount,
  payload: totalAmount,
});
export const buyGamesAction = (totalAmount: number): { type: string; payload: number } => ({
  type: buyGames,
  payload: totalAmount,
});
