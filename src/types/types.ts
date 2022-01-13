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

export interface ProductParams {
  platform: string;
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
  dispatch: Dispatch<unknown>;
  login: string;
  password: string;
  message: string;
  postFunc: FormEventHandler<HTMLFormElement>;
  loginGetter: (value: string) => void;
  passwordGetter: (value: string) => void;
  messageGetter: (value: string) => void;
  verifyPassword: (value: string) => void;
}

export interface SignUpModalProps {
  dispatch: Dispatch<unknown>;
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
export type LogInFunctionType = (userName: string) => void;
export type LogOutFunctionType = () => void;

export interface InputProps {
  name: string;
  id: string;
  type: string;
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
}

export interface SignInBtnProps {
  dispatch: Dispatch<unknown>;
}

export interface SignUpBtnProps {
  dispatch: Dispatch<unknown>;
}
export interface ProtectedRouteProps<RouteProps> {
  dispatch: Dispatch<unknown>;
}

export interface SignOutBtnProps {
  dispatch: Dispatch<unknown>;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UserNameProps {
  userName: string | undefined;
}
