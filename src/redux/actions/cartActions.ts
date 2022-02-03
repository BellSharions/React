import { GameCart } from "@/types";
import { createAction } from "@reduxjs/toolkit";

interface IAmount {
  title: string;
  amount: number;
}

interface ICheck {
  title: string;
  check: boolean;
}

export const enum CartActions {
  ADD_GAME_TO_CART = "ADD_GAME_TO_CART",
  SET_CART_GAMES = "SET_CART_GAMES",
  CHANGE_GAME_CHECK = "CHANGE_GAME_CHECK",
  CHANGE_GAME_AMOUNT = "CHANGE_GAME_AMOUNT",
  REMOVE_GAME_FROM_CART = "REMOVE_GAME_FROM_CART",
  INCREASE_TOTAL_AMOUNT = "INCREASE_TOTAL_AMOUNT",
  DECREASE_TOTAL_AMOUNT = "DECREASE_TOTAL_AMOUNT",
  BUY_GAMES = "BUY_GAMES",
}

export const addGameToCartAction = createAction<GameCart>(CartActions.ADD_GAME_TO_CART);
export const setCartGamesAction = createAction<GameCart[]>(CartActions.SET_CART_GAMES);
export const changeGameCheckAction = createAction<ICheck>(CartActions.CHANGE_GAME_CHECK);
export const changeGameAmountAction = createAction<IAmount>(CartActions.CHANGE_GAME_AMOUNT);
export const removeGameFromCartAction = createAction(CartActions.REMOVE_GAME_FROM_CART);
export const increaseTotalAmountAction = createAction<number>(CartActions.INCREASE_TOTAL_AMOUNT);
export const decreaseTotalAmountAction = createAction<number>(CartActions.DECREASE_TOTAL_AMOUNT);
export const buyGamesAction = createAction<number>(CartActions.BUY_GAMES);
