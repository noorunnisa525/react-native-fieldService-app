/**
 *  Redux saga class init
 */
import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/types';
import crewLookupByIdSagaAsync from './crewLookupByIdSaga';
import topItemsListSaga from './topItemsListSaga';
import crewLokkupSagaAsync from './crewLookupSaga';
import loginAsync from './loginSaga';
import userDataAsync from './userDataSaga';
import allItemsListSaga from './allItemsListSaga';
import pickListSaga from './pickListSaga';
import equipmentListSaga from './equipmentListSaga';

export default function* watch() {
    yield all([
        takeEvery(types.LOGIN_TRUCK, loginAsync),
        takeEvery(types.USER_DATA_REQUEST, userDataAsync),
        takeEvery(types.CREW_LOOKUP_DATA, crewLokkupSagaAsync),
        takeEvery(types.CREW_LOOKUP_BY_ID, crewLookupByIdSagaAsync),
        takeEvery(types.TOP_ITEMS_LIST, topItemsListSaga),
        takeEvery(types.ALL_ITEMS_LIST, allItemsListSaga),
        takeEvery(types.PICK_ITEMS_LIST, pickListSaga),
        takeEvery(types.EQUIPMENT_ITEMS_LIST, equipmentListSaga),
    ]);
}
