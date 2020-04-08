import { call, put, all, delay, takeEvery } from 'redux-saga/effects';
import { getLogin } from "./api";

export function* login(action){

    yield delay(2000);
    const data = yield getLogin(action.user);

    yield put({
        type: 'LOGIN',
        username: action.user.username,
        password: action.user.password,
    });
}

export default function* userSaga(){
    yield all([takeEvery('Login',login)]);
}