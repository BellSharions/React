import { createContext } from "react";

const LoggedInContext = createContext(false);
export const LoggedInProvider = LoggedInContext.Provider;
export const LoggedInConsumer = LoggedInContext.Consumer;

const UserNameContext = createContext("");
export const UserNameProvider = UserNameContext.Provider;
export const UserNameConsumer = UserNameContext.Consumer;
