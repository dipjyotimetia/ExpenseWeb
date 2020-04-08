export const login = (username, password) => {
    // console.log('logging in action');
    return {
        type: 'LOGIN',
        username,
        password,
    };
};

export const loginSuccess = (username, token) => {
    return {
        type: 'LOGIN_SUCCESS',
        username,
        token,
    };
};

export const loginFailure = () => {
    return {
        type: 'LOGIN_FAILURE',
    };
};

export const logout = () => {
    return {
        type: 'LOG_OUT',
    };
};