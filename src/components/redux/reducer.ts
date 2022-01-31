import { Game } from "@/types/types";
import { combineReducers } from "redux";
import {
  logInType,
  logOutType,
  showSignInModal,
  showSignUpModal,
  closeModal,
  showChangePassModal,
  changeUsernameType,
  changeLoading,
  showBuyModal,
  setRoleType,
  showEditGameModal,
  showAddGameModal,
  showDeleteGameModal,
  fetchGames,
} from "./actionTypes";
import adminReducer from "./admin/adminReducer";
import CartReducer from "./cart/cartReducer";
import {
  changeSearchType,
  fetchGamesSuccess,
  filterByAgeType,
  filterByGenreType,
  filterBySelection,
  filterBySelectionDirection,
} from "./filter/filterActionTypes";

export const initialState = {
  loggedIn: false,
  isLoading: false,
  fetch: false,
  userName: "",
  role: "user",
  searchResult: [] as Game[],
  changePassModalVisible: false,
  editGameModalVisible: false,
  addGameModalVisible: false,
  deleteGameModalVisible: false,
  signInModalVisible: false,
  signUpModalVisible: false,
  buyModalVisible: false,
  age: "all ages",
  sort: "rating",
  sortDir: "asc",
  genre: "all genres",
  term: "",
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string | boolean | Game[] }
): {
  loggedIn: boolean;
  isLoading: boolean;
  fetch: boolean;
  userName: string;
  role: string;
  searchResult: Game[];
  changePassModalVisible: boolean;
  editGameModalVisible: boolean;
  addGameModalVisible: boolean;
  deleteGameModalVisible: boolean;
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
  buyModalVisible: boolean;
  age: string;
  sort: string;
  sortDir: string;
  genre: string;
  term: string;
} => {
  switch (action.type) {
    case logInType:
      return {
        ...state,
        loggedIn: true,
        userName: action.payload as string,
      };
    case setRoleType:
      return {
        ...state,
        role: action.payload as string,
      };
    case changeUsernameType:
      return {
        ...state,
        userName: action.payload as string,
      };
    case logOutType:
      return {
        ...state,
        loggedIn: false,
        userName: initialState.userName,
      };
    case showSignInModal:
      return {
        ...state,
        changePassModalVisible: false,
        signInModalVisible: true,
        signUpModalVisible: false,
      };
    case showSignUpModal:
      return {
        ...state,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: true,
      };
    case showChangePassModal:
      return {
        ...state,
        changePassModalVisible: true,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    case showEditGameModal:
      return {
        ...state,
        editGameModalVisible: true,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    case showAddGameModal:
      return {
        ...state,
        addGameModalVisible: true,
        editGameModalVisible: false,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    case showDeleteGameModal:
      return {
        ...state,
        deleteGameModalVisible: true,
        addGameModalVisible: false,
        editGameModalVisible: false,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    case changeLoading:
      return {
        ...state,
        isLoading: action.payload as boolean,
      };
    case closeModal:
      return {
        ...state,
        addGameModalVisible: false,
        deleteGameModalVisible: false,
        changePassModalVisible: false,
        editGameModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
        buyModalVisible: false,
      };
    case showBuyModal:
      return {
        ...state,
        buyModalVisible: true,
      };
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
    case fetchGames:
      return {
        ...state,
        fetch: action.payload as boolean,
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
export const rootReducer = combineReducers({
  reducer,
  admin: adminReducer,
  cart: CartReducer,
});
export default reducer;
export type ReducerState = ReturnType<typeof rootReducer>;
