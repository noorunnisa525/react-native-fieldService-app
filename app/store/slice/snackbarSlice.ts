/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import { SnackBarState } from "app/models/reducers/snackBar";
import { createSlice } from "@reduxjs/toolkit";
const initialState: SnackBarState = {
  message: "",
  isVisible: false,
};

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    enableSnackBar: (state: SnackBarState, action) => {
      return {
        ...state,
        isVisible: true,
        message:
          action.payload == "" ? "Some thing went wrong" : action?.payload,
      };
    },
    disableSnackBar: (state: SnackBarState) => {
      return {
        ...state,
        isVisible: false,
        message: "",
      };
    },
  },
});

export const { enableSnackBar, disableSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;
