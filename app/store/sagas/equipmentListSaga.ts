import equipmentList from "app/services/equipmentList";
import { call, put } from "redux-saga/effects";

import * as loadingAction from "../slice/loadingSlice";
import * as appActions from "./../slice/appSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
const getAppUrl = async () => {
  return await AsyncStorage.getItem("API_URL");
};
let bassURL = "https://field-service-fake-api.herokuapp.com/";
export default function* equipmentListSagaAsync(action) {
  try {
    yield put(loadingAction.enableLoader());
    //how to call api
    let url: string = yield call(getAppUrl);

    let params = url == bassURL ? "" : "/" + action.payload;

    const response: AxiosResponse<any> = yield call(equipmentList);

    if (response.status === 200) {
      yield put(appActions.equipmentList(response.data));
    }
  } catch (error) {
    yield put(appActions.equipmentList([]));
  } finally {
    yield put(loadingAction.disableLoader());
  }
}
