/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import getCrewLookupById from "app/services/getCrewLookupById";
import { call, delay, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";

const getAppUrl = async () => {
  return await AsyncStorage.getItem("API_URL");
};
let bassURL = "https://field-service-fake-api.herokuapp.com/";
export default function* crewLookupByIdSagaAsync(action) {
  try {
    yield put(loadingAction.enableLoader());
    yield put(appActions.crewLookupById([]));
    let url: string = yield call(getAppUrl);

    let params = url == bassURL ? "" : "/" + action.payload;

    const response: AxiosResponse<any> = yield call(getCrewLookupById, params);

    if (response.status == 200) {
      yield put(appActions.crewLookupById(response.data));
    }
  } catch (error) {
    console.log("error sagaaa", error);
  } finally {
    yield delay(600);
    yield put(loadingAction.disableLoader());
  }
}
