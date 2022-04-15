/* Login Reducer
 * handles login states in the app
 */
import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "./../../models/reducers/app";
const initialState: AppState = {
  order: [],
  item: [
    { item: "Sand", description: "Quality grade 1" },
    { item: "Powder", description: "Quality grade 2" },
    { item: "Brick", description: "Quality grade 3" },
  ],
  crewLookup: [],
  crewLookupById: [],
  topItemList: [],
  allItemsList: [],
  pickItemsList: [],
  equipmentList: [],
  isNewworkAvailable: false,
  baseURL: "",
  loginTrcuk: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addData: (state, action) => {
      return {
        ...state,
        order: action.payload,
      };
    },
    removeData: (state) => {
      return {
        ...state,
        order: [],
      };
    },
    setItem: (state, action) => {
      return {
        ...state,
        item: action.payload,
      };
    },
    crewLookupById: (state, action) => {
      return {
        ...state,
        crewLookupById: action.payload,
      };
    },
    crewLookup: (state, action) => {
      return {
        ...state,
        crewLookup: action.payload,
      };
    },
    topItemList: (state, action) => {
      return {
        ...state,
        topItemList: action.payload,
      };
    },
    allItemsList: (state, action) => {
      return {
        ...state,
        allItemsList: action.payload,
      };
    },
    pickItemsList: (state, action) => {
      return {
        ...state,
        pickItemsList: action.payload,
      };
    },
    equipmentList: (state, action) => {
      return {
        ...state,
        equipmentList: action.payload,
      };
    },
    setNetworkRequest: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isNewworkAvailable: action.payload,
      };
    },
    onSelectBaseURL: (state, action) => {
      return {
        ...state,
        baseURL: action.payload,
      };
    },

    resetData: () => {
      return initialState;
    },
  },
});

export const {
  addData,
  removeData,
  setItem,
  crewLookup,
  crewLookupById,
  topItemList,
  allItemsList,
  pickItemsList,
  equipmentList,
  setNetworkRequest,
  onSelectBaseURL,
  resetData,
} = appSlice.actions;
export default appSlice.reducer;
