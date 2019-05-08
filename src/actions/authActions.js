import axios from "axios";
import { baseURL } from '../baseURL';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    VERIFY_USER
} from "./types";

// Register User
export const signupUser = (userData, history) => dispatch => {
    axios
        .post(`${baseURL}/users/signup`, userData)
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post(`${baseURL}/users/login`, userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};

// Verify user
export const verifyUser = tempToken => dispatch => {
    axios
        .put(`${baseURL}/users/confirmation?temp=${tempToken}`)
        .then((response) => {
            if (response.data && response.status === 200) {
                dispatch({
                    type: VERIFY_USER,
                    payload: response.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        })
}
