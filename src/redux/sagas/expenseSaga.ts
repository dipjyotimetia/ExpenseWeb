import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

const ExpenseApi = 'https://g5aeksi9kh.execute-api.ap-southeast-2.amazonaws.com/dev/api/expenses/testtest@gmail.com'


function getApi() {
    return fetch(ExpenseApi, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(err => { throw err })
}

function* fetchExpense(action) {
    try {
        const expense = yield call(getApi);
        yield put({type: 'GET_EXPENSE_SUCCESS', expense: expense})
    } catch (error) {
        yield put({ type: 'GET_EXPENSE_FAILURE', message: error.message });
    }
}

function* expenseSaga() {
    yield takeEvery('GET_EXPENSE_REQUESTED', fetchExpense);
}

export default expenseSaga;