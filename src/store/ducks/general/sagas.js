import { call, takeLatest, put } from "@redux-saga/core/effects";
import { SetGeneral } from "./actionCreators";
import { GeneralApi } from "../../../services/api/generalApi";

export function* fetchGeneralRequest() {
    try {
        const items = yield call(GeneralApi.fetchGeneral);
        yield put(SetGeneral(items.content));
    }
    catch (error) {
        console.log('FETCH_GENERAL', error)
    }
}
export function* generalSaga() {
    yield takeLatest('FETCH_GENERAL', fetchGeneralRequest);
}
