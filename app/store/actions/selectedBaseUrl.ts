/*
 * Reducer actions related with login
 */
import * as types from "./types";
import { createAction } from "@reduxjs/toolkit";

export const selectBaseURL = createAction(
  types.SELECT_BASE_URL,
  function prepare(data: any) {
    return {
      payload: data,
    };
  }
);
