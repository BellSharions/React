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
} from "./actionTypes";

export const logInAction = (userName: string): { type: string; payload: string } => ({
  type: logInType,
  payload: userName,
});
export const setRoleAction = (role: string): { type: string; payload: string } => ({
  type: setRoleType,
  payload: role,
});
export const changeUsernameAction = (userName: string): { type: string; payload: string } => ({
  type: changeUsernameType,
  payload: userName,
});

export const logOutAction = (): { type: string } => ({
  type: logOutType,
});

export const showSignInModalAction = (): { type: string } => ({
  type: showSignInModal,
});

export const showSignUpModalAction = (): { type: string } => ({
  type: showSignUpModal,
});
export const showBuyModalAction = (): { type: string } => ({
  type: showBuyModal,
});
export const showChangePassModalAction = (): { type: string } => ({
  type: showChangePassModal,
});
export const showEditGameModalAction = (): { type: string } => ({
  type: showEditGameModal,
});

export const closeModalAction = (): { type: string } => ({
  type: closeModal,
});
export const changeLoadingAction = (value: boolean): { type: string; payload: boolean } => ({
  type: changeLoading,
  payload: value,
});
