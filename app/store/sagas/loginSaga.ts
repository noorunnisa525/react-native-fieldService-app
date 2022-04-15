/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import loginTruck from "app/services/loginTruck";
import { call, put } from "redux-saga/effects";
// import { delay } from 'redux-saga';

import * as loadingAction from "./../slice/loadingSlice";
import * as userSlice from "./../slice/userSlice";
import Toast from "react-native-simple-toast";
import { AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiConfig from "app/config/api-config";

// Our worker Saga that logins the user
const getAppUrl = async () => {
  return await AsyncStorage.getItem("API_URL");
};
let bassURL = "https://field-service-fake-api.herokuapp.com/";
export default function* loginAsync(action) {
  try {
    //how to call api
    let url: string = yield call(getAppUrl);

    let params = url == bassURL ? "" : "/" + action.payload;
    console.log("params", params);

    yield put(loadingAction.enableLoader());
    const response: AxiosResponse<any> = yield call(loginTruck, params);

    //mock response
    // const response = { success: true, data: { id: 1 }, message: 'Success' };

    if (response.status == 200) {
      yield put(
        userSlice.onLogin({
          email: action.payload,
          ...response?.data[0],
        })
      );
    } else {
      Toast.show("No Truck with this BaseUrl found", Toast.SHORT);
    }
  } catch (error) {
    console.log("user error ", error);
  } finally {
    yield put(loadingAction.disableLoader());
  }
}
