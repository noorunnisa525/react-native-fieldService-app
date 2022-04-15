/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from "@reduxjs/toolkit";

import { LoginState } from "./../../models/reducers/login";
const initialState: LoginState = {
  isLoggedIn: false,
  id: 0,
  password: "",
  email: "",
  iPadID: "",
  truckID: "",
  crewID: "",
};

const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
        iPadID: action.payload.iPadID,
        truckID: action.payload.truckID?.toUpperCase(),
        crewID: action.payload.crewID,
      };
    },
    onUserData: (state, action) => {
      return {
        ...state,
        id: action.payload,
      };
    },

    onChangeCrewId: (state, action) => {
      console.log("crewIDcrewIDcrewID", action.payload);
      return {
        ...state,
        crewID: action.payload,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        isLoggedIn: false,
        id: 0,
        password: "",
      };
    },
  },
});

export const {
  onLogin,
  logOut,
  onUserData,
  onChangeCrewId,
} = loginSlice.actions;
export default loginSlice.reducer;
