import { all } from 'redux-saga/effects';
import expenseSaga from "./expenseSaga";

export default function* rootSaga() {
    yield all([
        expenseSaga(),
    ])
}
