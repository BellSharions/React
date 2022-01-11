import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
export interface ProtectedParams {
  path: string;
}
export interface CategoryProp {
  title: string;
  path: string;
  icon: IconProp;
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

export interface HeaderProps {
  dispatchedLogOutAction: LogOutFunctionType;
  dispatchedLogInAction: LogInFunctionType;
  userName?: string;
  loggedIn?: boolean;
}

export interface SignInBtnProps {
  dispatchedLogInAction: LogInFunctionType;
}

export interface SignUpBtnProps {
  dispatchedLogInAction: LogInFunctionType;
}

export interface SignOutBtnProps {
  dispatchedLogOutAction: LogOutFunctionType;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface UserNameProps {
  userName: string | undefined;
}
