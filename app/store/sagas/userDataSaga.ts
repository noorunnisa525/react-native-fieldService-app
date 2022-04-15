/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, call } from 'redux-saga/effects';
// import { delay } from 'redux-saga';

import * as loadingAction from './../slice/loadingSlice';
import * as loginActions from './../slice/userSlice';
import userData from './../../services/userData';

// Our worker Saga that logins the user
export default function* userDataAsync() {
    try {
        const response = yield call(userData);
        //mock response

        if (response.status == 200) {
            yield put(loginActions.onUserData(response.data.id));

            // no need to call navigate as this is handled by redux store with SwitchNavigator
            //yield call(navigationActions.navigateToHome);
        } else {
        }
    } catch (error) {
        console.log('error', error);
    }
    //how to call api
}
