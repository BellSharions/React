import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { DebouncedFunc } from "lodash";
import { ChangeEvent, ChangeEventHandler, Dispatch, FormEventHandler, SyntheticEvent } from "react";

export interface ProductItemProps {
  id?: number;
  title: string;
  description?: string;
  developer?: string;
  date: string;
  category: string;
  logo?: string;
}

export interface AppProps {
  props: string;
}

export interface AppState {
  loggedIn?: boolean;
  userName?: string;
  showSignInModal: boolean;
  showSignUpModal: boolean;
}

export interface PlatformParams {
  platform: string;
}
export interface ProductParams {
  platform: string;
  age: string;
  sort: string;
  sortDir: string;
  genre: string;
}
export interface CriteriaContainerProps {
  sort: string;
  sortDir: string;
}
export interface CriteriaProps {
  setCriteria: (value: string) => void;
  setType: (value: string) => void;
  sort: string;
  sortDir: string;
}
export interface Game {
  title: string;
  category: string;
  price: number;
  imgUrl: string;
  description: string;
  genre: string;
  age: number;
  rating?: number;
  id?: number;
  date?: string;
}
export interface FilterAction {
  type: string;
  payload: Game[];
}
export interface FilterState {
  loading: boolean;
  gamesList: Game[];
}
export interface RadioButtonProps {
  setSelect: (value: string) => void;
  array: Array<string>;
  filter: string;
}
export interface RadioButtonContainerProps {
  array: Array<string>;
  filter: string;
}
export interface SearchBarComponentProps {
  list: ProductItemProps[];
  isLoading: boolean;
  debouncedOnChange: DebouncedFunc<(e: ChangeEvent<HTMLInputElement>) => Promise<void>>;
}
export interface ProtectedParams {
  path: string;
}
export interface CategoryProp {
  title: string;
  path: string;
  icon: IconProp;
}
export interface SignInModalProps {
  closeModal: () => void;
  login: string;
  password: string;
  message: string;
  postFunc: FormEventHandler<HTMLFormElement>;
  loginGetter: (value: string) => void;
  passwordGetter: (value: string) => void;
  messageGetter: (value: string) => void;
  verifyPassword: (value: string) => void;
}
export interface PasswordModalProps {
  closeModal: () => void;
  changeFunc: (e: SyntheticEvent<Element, Event>) => Promise<null>;
  newPassword: string;
  passMessage: string;
  formValid: boolean;
  passwordGetter: (value: string) => void;
  repeatPasswordGetter: (passwordData: string) => void;
  repeatNewPassword: string;
  repeatPassMessage: string;
}

export interface SignUpModalProps {
  closeModal: () => void;
  logup: string;
  password: string;
  repeatPassword: string;
  message: string;
  putFunc: (e: SyntheticEvent<Element, Event>) => Promise<unknown>;
  logupGetter: (value: string) => void;
  passwordGetter: (value: string) => void;
  verifyPassword: (value: string) => void;
  repeatPasswordGetter: (value: string) => void;
}
export interface ProfileProps {
  userName: string;
  profilePic: string;
  saveHandler: (e: React.SyntheticEvent) => Promise<void>;
  userNameGetter: (value: string) => void;
  profilePicGetter: () => void;
  profilePicHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  message: string;
  descriptionGetter: (value: string) => void;
  description: string;
  formValid: boolean;
  action: () => void;
}
export type LogInFunctionType = (userName: string) => void;
export type LogOutFunctionType = () => void;

export interface InputProps {
  name: string;
  id: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}
export interface TextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}
export interface TextAreaContainerProps {
  name: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
}
export interface InputComponentProps {
  name: string;
  id: string;
  type: string;
  value: string;
  changeHandler: ChangeEventHandler<HTMLInputElement>;
}

export interface HeaderProps {
  userName?: string;
  loggedIn?: boolean;
  showSignInModal: () => void;
  showSignUpModal: () => void;
  logOut: () => void;
}

export interface SignInBtnProps {
  showModal: () => void;
}

export interface SignUpBtnProps {
  showModal: () => void;
}
export interface BtnProps {
  action: () => void;
  text: { label: string; icon: string };
}
export interface BtnContainerProps {
  action: () => void;
  childrenProps: { label: string; icon: string };
}
export interface ProtectedRouteProps {
  dispatch: Dispatch<unknown>;
}

export interface SignOutBtnProps {
  logOut: () => void;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UserNameProps {
  userName: string | undefined;
}
