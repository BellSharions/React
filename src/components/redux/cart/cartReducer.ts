import {
  addGameToCart,
  changeGameCheck,
  removeGameFromCart,
  changeGameAmount,
  buyGames,
  increaseTotalAmount,
  decreaseTotalAmount,
} from "./cartActionTypes";
import { CartAction, CartStateType, GameCart } from "../../../types/types";

const InitialCartState: CartStateType = {
  gamesList: [],
  totalPurchase: 0,
  userBalance: 1000,
};

const CartReducer = (state = InitialCartState, action: CartAction): CartStateType => {
  switch (action.type) {
    case addGameToCart:
      return {
        ...state,
        gamesList: state.gamesList.concat(action.payload as GameCart[]),
        totalPurchase: state.totalPurchase,
        userBalance: state.userBalance,
      };
    case changeGameCheck:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) =>
            (action.payload as GameCart[]).find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
        totalPurchase: state.totalPurchase,
        userBalance: state.userBalance,
      };
    case changeGameAmount:
      return {
        ...state,
        gamesList: state.gamesList.map(
          (initGame) =>
            (action.payload as GameCart[]).find((game: { title: string }) => game.title === initGame.title) || initGame
        ),
        totalPurchase: state.totalPurchase,
        userBalance: state.userBalance,
      };
    case removeGameFromCart:
      return {
        ...state,
        gamesList: state.gamesList.filter((game) => game.check === false),
        totalPurchase: InitialCartState.totalPurchase,
        userBalance: state.userBalance,
      };

    case increaseTotalAmount:
      return {
        ...state,
        gamesList: state.gamesList,
        totalPurchase: state.totalPurchase + (action.payload as number),
        userBalance: state.userBalance,
      };

    case decreaseTotalAmount:
      return {
        ...state,
        gamesList: state.gamesList,
        totalPurchase: state.totalPurchase - (action.payload as number),
        userBalance: state.userBalance,
      };

    case buyGames:
      return {
        ...state,
        gamesList: InitialCartState.gamesList,
        totalPurchase: state.totalPurchase,
        userBalance: state.userBalance - (action.payload as number),
      };
    default:
      return state;
  }
};

export default CartReducer;
