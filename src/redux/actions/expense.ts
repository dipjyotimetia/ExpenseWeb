import * as type from '../types';

export function getExpense(expense) {
    return {
        type : type.GET_EXPENSE_REQUESTED,
        payload: expense
    }
}