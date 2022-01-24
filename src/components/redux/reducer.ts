import {
  logInType,
  logOutType,
  showSignInModal,
  showSignUpModal,
  closeModal,
  showChangePassModal,
  changeUsernameType,
  changeLoading,
} from "./actionTypes";
import {
  changeSearchType,
  filterByAgeType,
  filterByGenreType,
  filterByPriceAscending,
  filterByPriceDescending,
  filterByRatingAscending,
  filterByRatingDescending,
  filterBySelection,
  filterBySelectionDirection,
} from "./filter/filterActionTypes";

export const initialState = {
  loggedIn: false,
  isLoading: false,
  userName: "",
  changePassModalVisible: false,
  signInModalVisible: false,
  signUpModalVisible: false,
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
  changePassModalVisible: boolean;
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
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
    case changeLoading:
      return {
        ...state,
        isLoading: action.payload,
      };
    case closeModal:
      return {
        ...state,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    case filterByRatingDescending:
      return {
        ...state,
        sort: "rating",
        sortDir: "desc",
      };
    case filterByRatingAscending:
      return {
        ...state,
        sort: "rating",
        sortDir: "asc",
      };
    case filterByPriceDescending:
      return {
        ...state,
        sort: "price",
        sortDir: "desc",
      };
    case filterByPriceAscending:
      return {
        ...state,
        sort: "price",
        sortDir: "asc",
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

export default reducer;
export type ReducerState = ReturnType<typeof reducer>;
