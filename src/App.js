import React, { Component } from 'react';
import './App.css';
import AppRouter from './components/layout/AppRouter';
import jwt_decode from "jwt-decode";
import { Provider } from 'react-redux';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import store from './store';

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "./login";
    }
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <AppRouter />
                </div>
            </Provider>
        )
    }
}