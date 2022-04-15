/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import getCrewLookup from "app/services/getCrewLookup";
import { call, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import { AxiosResponse } from "axios";

// Our worker Saga that logins the user
export default function* crewLokkupSagaAsync(action: {
  crewId: string;
  crewName: string;
  crewType: string;
}) {
  try {
    yield put(loadingAction.enableLoader());
    const response: AxiosResponse<any> = yield call(getCrewLookup);
    if (response.status === 200) {
      yield put(appActions.crewLookup(response.data));
    }
  } catch (error) {
  } finally {
    yield put(loadingAction.disableLoader());
  }
}
