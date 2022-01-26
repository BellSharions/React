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
} from "./actionTypes";
import adminReducer from "./admin/adminReducer";
import CartReducer from "./cart/cartReducer";
import {
  changeSearchType,
  filterByAgeType,
  filterByGenreType,
  filterBySelection,
  filterBySelectionDirection,
} from "./filter/filterActionTypes";

export const initialState = {
  loggedIn: false,
  isLoading: false,
  userName: "",
  role: "user",
  changePassModalVisible: false,
  editGameModalVisible: false,
  addGameModalVisible: false,
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
  action: { type: string; payload: string }
): {
  loggedIn: boolean;
  isLoading: boolean;
  userName: string;
  role: string;
  changePassModalVisible: boolean;
  editGameModalVisible: boolean;
  addGameModalVisible: boolean;
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
        userName: action.payload,
      };
    case setRoleType:
      return {
        ...state,
        role: action.payload,
      };
    case changeUsernameType:
      return {
        ...state,
        userName: action.payload,
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
    case changeLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case closeModal:
      return {
        ...state,
        addGameModalVisible: false,
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
        sort: action.payload,
      };
    case filterBySelectionDirection:
      return {
        ...state,
        sortDir: action.payload,
      };
    case filterByAgeType:
      return {
        ...state,
        age: action.payload,
      };
    case filterByGenreType:
      return {
        ...state,
        genre: action.payload,
      };
    case changeSearchType:
      return {
        ...state,
        term: action.payload,
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
