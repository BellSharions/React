import { Roles } from "@/constants";
import { Game } from "@/types";
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
} from "./actionTypes";
import adminReducer from "./admin/adminReducer";
import CartReducer from "./cart/cartReducer";
import filterReducer from "./filter/filterReducer";

export const initialState = {
  loggedIn: false,
  isLoading: false,
  fetch: false,
  userName: "",
  role: Roles.USER,
  changePassModalVisible: false,
  editGameModalVisible: false,
  addGameModalVisible: false,
  deleteGameModalVisible: false,
  signInModalVisible: false,
  signUpModalVisible: false,
  buyModalVisible: false,
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
  changePassModalVisible: boolean;
  editGameModalVisible: boolean;
  addGameModalVisible: boolean;
  deleteGameModalVisible: boolean;
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
  buyModalVisible: boolean;
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
    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  reducer,
  admin: adminReducer,
  cart: CartReducer,
  filter: filterReducer,
});
export default reducer;
export type ReducerState = ReturnType<typeof rootReducer>;
