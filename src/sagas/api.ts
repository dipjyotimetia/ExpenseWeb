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

export const getLogin = async (user) => {
    const res = await api.post(`${AccountApi}/users/login`, JSON.stringify({ email: user.email, password: user.password }));
    return res.data;
}