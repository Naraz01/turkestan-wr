import { all } from 'redux-saga/effects';
import { generalSaga } from './ducks/general/sagas';
import { userSaga } from './ducks/user/sagas'

export default function* rootSaga() {
    yield all([
        generalSaga(),
        userSaga()
    ]);
}
