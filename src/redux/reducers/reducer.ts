import { Roles } from "@/constants";
import { createReducer } from "@reduxjs/toolkit";
import {
  logInAction,
  setRoleAction,
  changeUsernameAction,
  logOutAction,
  changeLoadingAction,
} from "../actions/actions";

export const initialState = {
  loggedIn: false,
  isLoading: false,
  userName: "",
  role: Roles.USER,
};

interface IUserAction {
  payload: string;
  type: string;
}

interface IUserBoolAction {
  payload: boolean;
  type: string;
}

interface IUserRoleAction {
  payload: Roles;
  type: string;
}

function logIn(state: typeof initialState, action: IUserAction) {
  return {
    ...state,
    loggedIn: true,
    userName: action.payload,
  };
}

function setRole(state: typeof initialState, action: IUserRoleAction) {
  return {
    ...state,
    role: action.payload,
  };
}

function changeUsername(state: typeof initialState, action: IUserAction) {
  return {
    ...state,
    userName: action.payload,
  };
}

function logOut(state: typeof initialState) {
  return {
    ...state,
    loggedIn: false,
    userName: initialState.userName,
  };
}

function changeLoading(state: typeof initialState, action: IUserBoolAction) {
  return {
    ...state,
    isLoading: action.payload,
  };
}

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(logInAction, logIn);
  builder.addCase(setRoleAction, setRole);
  builder.addCase(changeUsernameAction, changeUsername);
  builder.addCase(logOutAction, logOut);
  builder.addCase(changeLoadingAction, changeLoading);
});

export default userReducer;
