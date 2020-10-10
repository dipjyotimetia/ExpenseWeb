import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/index";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = compose(
    applyMiddleware(sagaMiddleware),
    composeWithDevTools(),
)(createStore)(rootReducer)

sagaMiddleware.run(rootSaga);

export default store;