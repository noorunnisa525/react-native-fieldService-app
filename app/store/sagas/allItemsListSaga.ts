/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import allItemsList from "app/services/allItemsList";
import { call, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import { AxiosResponse } from "axios";

// Our worker Saga that logins the user
export default function* allItemsListSagaAsync() {
  try {
    yield put(loadingAction.enableLoader());
    //how to call api
    const response: AxiosResponse<any> = yield call(allItemsList);

    //mock response
    // const response = { success: true, data: { id: 1 }, message: 'Success' };

    if (response.status === 200) {
      yield put(loadingAction.disableLoader());
      yield put(appActions.allItemsList(response.data));
      // no need to call navigate as this is handled by redux store with SwitchNavigator
      //yield call(navigationActions.navigateToHome);
    } else {
      yield put(loadingAction.disableLoader());
    }
  } catch (error) {}
}
