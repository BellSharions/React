import { Roles } from "@/constants";
import { createAction } from "@reduxjs/toolkit";

export const enum UserActions {
  LOG_IN = "LOG_IN",
  SET_ROLE = "SET_ROLE",
  CHANGE_USERNAME = "CHANGE_USERNAME",
  LOG_OUT = "LOG_OUT",
  CHANGE_LOADING = "CHANGE_LOADING",
}
export const logInAction = createAction<string>(UserActions.LOG_IN);
export const setRoleAction = createAction<Roles>(UserActions.SET_ROLE);
export const changeUsernameAction = createAction<string>(UserActions.CHANGE_USERNAME);
export const logOutAction = createAction(UserActions.LOG_OUT);
export const changeLoadingAction = createAction<boolean>(UserActions.CHANGE_LOADING);
