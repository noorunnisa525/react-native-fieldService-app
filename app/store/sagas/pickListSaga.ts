/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import pickItemList from "app/services/pickItemList";
import { call, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";

// Our worker Saga that logins the user
let bassURL = "https://field-service-fake-api.herokuapp.com/";

const getAppUrl = async () => {
  return await AsyncStorage.getItem("API_URL");
};
export default function* pickListSagaAsync(action) {
  try {
    yield put(loadingAction.enableLoader());
    //how to call api
    let url: string = yield call(getAppUrl);
    let params = url == bassURL ? "" : "/" + action.payload;

    const response: AxiosResponse<any> = yield call(pickItemList, params);

    //mock response
    // const response = { success: true, data: { id: 1 }, message: 'Success' };

    if (response.status === 200) {
      yield put(loadingAction.disableLoader());
      yield put(appActions.pickItemsList(response.data));
      // no need to call navigate as this is handled by redux store with SwitchNavigator
      //yield call(navigationActions.navigateToHome);
    } else {
      yield put(loadingAction.disableLoader());
    }
  } catch (error) {}
}
