import { combineReducers } from "redux";
import expense from './reducers/expense'

const rootReducer = combineReducers({
    expense: expense,
})
  
  export type RootState = ReturnType<typeof rootReducer>