/*
 * Reducer actions related with login
 */
import * as types from './types';
import { createAction } from '@reduxjs/toolkit';

export const requestLogin = createAction(
    types.LOGIN_REQUEST,
    function prepare(data: any) {
        return {
            payload: data,
        };
    },
);
export const userData = createAction(
    types.USER_DATA_REQUEST,
    
);
