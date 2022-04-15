/*
 * Reducer actions related with login
 */
import * as types from './types';
import { createAction } from '@reduxjs/toolkit';

export const requestCrewLookup = createAction(
    types.CREW_LOOKUP_DATA,
    function prepare(data: any) {
        return {
            payload: data,
        };
    },
);
