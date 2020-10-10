import { combineReducers } from "redux";
import expense from './expense'

const rootReducer = combineReducers({
    expense: expense,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>