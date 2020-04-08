const NOT_LOGGED_IN = 'NOT_LOGGED_IN';
const LOGGED_IN = 'LOGGED_IN';
const FAILED_LOGIN = 'FAILED_LOGIN';
const LOGGING_IN = 'LOGGING_IN';
const LOGGED_OUT = 'LOGGED_OUT';

const LOGIN = 'LOGIN';
const LOG_OUT = 'LOG_OUT';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const userReducer = (
    state = {
        status: NOT_LOGGED_IN,
    },
    action
) => {
    console.log(action.type);
    switch (action.type) {
        case LOGIN: {
            return {
                status: LOGGING_IN,
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                status: LOGGED_IN,
                username: action.username,
                token: action.token,
            };
        }
        case LOGIN_FAILURE: {
            return {
                status: FAILED_LOGIN,
            };
        }
        case LOG_OUT: {
            return {
                status: LOGGED_OUT,
            };
        }

        default:
            return state;
    }
};

export default userReducer;