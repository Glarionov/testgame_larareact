import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS
} from '../actions/types'


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    languageId: 1
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            console.log(66666666666)
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true,
                userData: action.payload.userData,
                languageId: action.payload.userData.languageId
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isLoading: true,
                isAuthenticated: true,

            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('authTokens');
            return {
                ...state,
                token: null,
                userData: null,
                isLoading: false,
                isAuthenticated: false,
                languageId: 1
            }
        default:
            return state;
    }
}
