/*
 * combines all th existing reducers
 */
import loadingSlice from "./loadingSlice";
import userSlice from "./userSlice";
import themeSlice from "./themeSlice";
import { combineReducers } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import snackbarSlice from "./snackbarSlice";
const reducers = {
  loading: loadingSlice,
  theme: themeSlice,
  user: userSlice,
  app: appSlice,
  snackbar: snackbarSlice,
};

// Exports

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
