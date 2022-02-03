import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import adminReducer from "../reducers/adminReducer";
import CartReducer from "../reducers/cartReducer";
import filterReducer from "../reducers/filterReducer";
import { modalReducer } from "../reducers/modalReducer";
import userReducer from "../reducers/reducer";

export const rootReducer = combineReducers({
  reducer: userReducer,
  admin: adminReducer,
  cart: CartReducer,
  filter: filterReducer,
  modalReducer,
});
const store = configureStore({ reducer: rootReducer });

export type ReducerState = ReturnType<typeof rootReducer>;

export default store;
