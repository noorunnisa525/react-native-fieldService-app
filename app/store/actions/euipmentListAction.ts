/*
 * Reducer actions related with login
 */
import * as types from './types';
import { createAction } from '@reduxjs/toolkit';

export const requestEquipmentList = createAction(
    types.EQUIPMENT_ITEMS_LIST,
    function prepare(data: any) {
        return {
            payload: data,
        };
    },
);
