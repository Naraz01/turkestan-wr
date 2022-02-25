import { call, takeLatest, put } from "@redux-saga/core/effects";
import { SetUser } from "./actionCreators";
import { AuthApi } from "../../../services/api/authApi";

export function* fetchUserRequest(data) {
    try {
        const items = yield call(AuthApi.fetchLogin, data.payload);
        yield put(SetUser(items.content));
        localStorage.setItem('token', items.content.token);
    }
    catch (error) {
        console.log('FETCH_USER', error)
    }
}
export function* userSaga() {
    yield takeLatest('FETCH_USER', fetchUserRequest);
}
