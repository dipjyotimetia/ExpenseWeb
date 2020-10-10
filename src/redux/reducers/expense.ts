import * as type from '../types';

const initialState = {
    expense: [],
    loading: false,
    error: null
}

export default function expenses(state = initialState, action) {
    switch (action.type) {
        case type.GET_EXPENSE_REQUESTED:
            return {
                ...state,
                loading: true,
            }
        case type.GET_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false,
                expense: action.expense,
            }
        case type.GET_EXPENSE_FAILED:
            return {
                ...state,
                loading: false,
                errror: action.message,
            }
        default:
            return state;
    }
}