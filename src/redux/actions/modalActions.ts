import { createAction } from "@reduxjs/toolkit";

export const enum ModalActions {
  SHOW_MODAL = "SHOW_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
}
export const showModalAction = createAction<string>(ModalActions.SHOW_MODAL);
export const closeModalAction = createAction<string>(ModalActions.CLOSE_MODAL);
