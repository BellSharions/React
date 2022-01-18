import {
  logInType,
  logOutType,
  showSignInModal,
  showSignUpModal,
  closeModal,
  showChangePassModal,
  changeUsernameType,
} from "./actionTypes";

export const initialState = {
  loggedIn: false,
  userName: "",
  changePassModalVisible: false,
  signInModalVisible: false,
  signUpModalVisible: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
): {
  loggedIn: boolean;
  userName: string;
  changePassModalVisible: boolean;
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
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
    case closeModal:
      return {
        ...state,
        changePassModalVisible: false,
        signInModalVisible: false,
        signUpModalVisible: false,
      };
    default:
      return state;
  }
};

export default reducer;
export type ReducerState = ReturnType<typeof reducer>;
