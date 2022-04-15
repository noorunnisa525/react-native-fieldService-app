/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import topItemList from "app/services/topItemList";
import { call, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import { AxiosResponse } from "axios";

// Our worker Saga that logins the user
export default function* topItemsListSagaAsync() {
  try {
    yield put(loadingAction.enableLoader());
    const response: AxiosResponse<any> = yield call(topItemList);
    if (response.status === 200) {
      yield put(loadingAction.disableLoader());
      yield put(appActions.topItemList(response.data));
    } else {
      yield put(loadingAction.disableLoader());
    }
  } catch (error) {}
}
