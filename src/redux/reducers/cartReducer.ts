import { createReducer } from "@reduxjs/toolkit";
import {
  addGameToCartAction,
  setCartGamesAction,
  changeGameCheckAction,
  changeGameAmountAction,
  removeGameFromCartAction,
  increaseTotalAmountAction,
  decreaseTotalAmountAction,
  buyGamesAction,
} from "../actions/cartActions";
import { CartStateType, GameCart } from "../../types";

const InitialCartState: CartStateType = {
  gamesList: [] as GameCart[],
  totalPurchase: 0,
  userBalance: 1000,
};
interface ICartAction {
  payload: GameCart[];
  type: string;
}
interface ICartSingleAction {
  payload: GameCart;
  type: string;
}
interface ICartNumberAction {
  payload: number;
  type: string;
}
interface ICartStringAction {
  payload: string;
  type: string;
}
interface IAmount {
  title: string;
  amount: number;
}
interface ICheck {
  title: string;
  check: boolean;
}
interface ICartAmountAction {
  payload: IAmount;
  type: string;
}
interface ICartCheckAction {
  payload: ICheck;
  type: string;
}

function addGameToCart(state: CartStateType, action: ICartSingleAction) {
  return {
    ...state,
    gamesList: state.gamesList.concat(action.payload),
    totalPurchase: state.totalPurchase,
    userBalance: state.userBalance,
  };
}

function setCartGames(state: CartStateType, action: ICartAction) {
  return {
    ...state,
    gamesList: action.payload,
    totalPurchase: state.totalPurchase,
    userBalance: state.userBalance,
  };
}
function changeGameCheck(state: CartStateType, action: ICartCheckAction) {
  return {
    ...state,
    gamesList: state.gamesList.map((initGame) =>
      action.payload.title === initGame.title ? { ...initGame, check: action.payload.check } : initGame
    ),
    totalPurchase: state.totalPurchase,
    userBalance: state.userBalance,
  };
}
function changeGameAmount(state: CartStateType, action: ICartAmountAction) {
  return {
    ...state,
    gamesList: state.gamesList.map((initGame) =>
      action.payload.title === initGame.title ? { ...initGame, amount: action.payload.amount } : initGame
    ),
    totalPurchase: state.totalPurchase,
    userBalance: state.userBalance,
  };
}
function removeGameFromCart(state: CartStateType) {
  return {
    ...state,
    gamesList: state.gamesList.filter((game) => game.check === false),
    totalPurchase: InitialCartState.totalPurchase,
    userBalance: state.userBalance,
  };
}
function increaseTotalAmount(state: CartStateType, action: ICartNumberAction) {
  return {
    ...state,
    gamesList: state.gamesList,
    totalPurchase: state.totalPurchase + action.payload,
    userBalance: state.userBalance,
  };
}
function decreaseTotalAmount(state: CartStateType, action: ICartNumberAction) {
  return {
    ...state,
    gamesList: state.gamesList,
    totalPurchase: state.totalPurchase - action.payload,
    userBalance: state.userBalance,
  };
}
function buyGames(state: CartStateType, action: ICartNumberAction) {
  return {
    ...state,
    gamesList: InitialCartState.gamesList,
    totalPurchase: state.totalPurchase,
    userBalance: state.userBalance - action.payload,
  };
}

export const CartReducer = createReducer(InitialCartState, (builder) => {
  builder.addCase(addGameToCartAction, addGameToCart);
  builder.addCase(setCartGamesAction, setCartGames);
  builder.addCase(changeGameCheckAction, changeGameCheck);
  builder.addCase(changeGameAmountAction, changeGameAmount);
  builder.addCase(removeGameFromCartAction, removeGameFromCart);
  builder.addCase(increaseTotalAmountAction, increaseTotalAmount);
  builder.addCase(decreaseTotalAmountAction, decreaseTotalAmount);
  builder.addCase(buyGamesAction, buyGames);
});

export default CartReducer;
