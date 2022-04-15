/*
 * Reducer actions related with login
 */
import * as types from './types';
import { createAction } from '@reduxjs/toolkit';

export const requestCrewLookupById = createAction(
    types.CREW_LOOKUP_BY_ID,
    function prepare(data: any) {
        return {
            payload: data,
        };
    },
);
