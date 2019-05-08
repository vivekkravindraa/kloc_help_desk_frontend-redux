import {
    SET_CURRENT_USER,
    USER_LOADING,
    VERIFY_USER
} from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {
    user: {},
    isAuthenticated: false,
    isConfirmed: false,
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case VERIFY_USER:
            return {
                ...state,
                isConfirmed: true
            }
        default:
            return state;
    }
}