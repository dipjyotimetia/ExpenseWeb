import axios from "axios";

const AccountApi = "http://localhost:3002";
const ExpenseApi = "http://localhost:3001";

const api = axios.create({
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});

export const getLogin = async ({ email, password }) => {
    const res = await api.post(`${AccountApi}/api/users/login`, JSON.stringify({ email, password }));
    return res.data;
}

export const registration = async ({ firstName, lastName, username, email, password }) => {
    const res = await api.post(`${AccountApi}/api/users/`, JSON.stringify({ firstName, lastName, username, email, password }));
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
    const res = await api2.get(`${AccountApi}/api/users/me`);
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
    const res = await api2.post(`${AccountApi}/api/users/me/logoutall`);
    return res.status;
}