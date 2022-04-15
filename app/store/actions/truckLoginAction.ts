/*
 * Reducer actions related with login
 */
import * as types from './types';
import { createAction } from '@reduxjs/toolkit';

export const requestLoginTruck = createAction(
    types.LOGIN_TRUCK,
    function prepare(data: any) {
        return {
            payload: data,
        };
    },
);

