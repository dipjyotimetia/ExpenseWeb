import axios from "axios";

const AccountApi = "https://bhsceu01z1.execute-api.ap-southeast-2.amazonaws.com/dev";
const ExpenseApi = "https://g5aeksi9kh.execute-api.ap-southeast-2.amazonaws.com/dev";

const api = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export const getLogin = async ({ email, password }) => {
    const res = await api.post(`${AccountApi}/users/login`, JSON.stringify({ email, password }));
    return res.data;
}

export const registration = async ({ firstName, lastName, username, email, password }) => {
    const res = await api.post(`${AccountApi}/users/`, JSON.stringify({ firstName, lastName, username, email, password }));
    return res.data;
}

export const getExpense = async (username) => {
    const res = await api.get(`${ExpenseApi}/api/expenses/${username}/`);
    return res.data;
}

export const addExpense = async ({ username, expenseType, expenseAmount, expenseDate }) => {
    const res = await api.post(`${ExpenseApi}/api/expenses`, JSON.stringify({ username, expenseType, expenseAmount, expenseDate }));
    return res.data;
}

export const getAccountDetails = async (token) => {
    const api2 = axios.create({
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await api2.get(`${AccountApi}/users/me`);
    return res.data;
}

export const logout = async (token) => {
    const api2 = axios.create({
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Authorization": `Bearer ${token}`
        }
    });
    const res = await api2.post(`${AccountApi}/users/me/logoutall`);
    return res.status;
}