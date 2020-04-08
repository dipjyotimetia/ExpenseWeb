
/* eslint-disable no-console */
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-unresolved
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import rootSaga from '../sagas/rootSaga';

import rootReducer from './rootReducer';

export default function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware({
    onError: error => {
      console.error(error);
    },
  });
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
}