import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from '../dashboard/privateroute/PrivateRoute';

import Dashboard from '../dashboard/Dashboard';
import Landing from './Landing';
import Login from '../auth/Login';
import Signup from '../auth/Signup';

const routes = [
    {
        path: "/",
        exact: true,
        main: () => <Landing />
    },
    {
        path: "/login",
        exact: true,
        main: () => <Login />
    },
    {
        path: "/signup",
        exact: true,
        main: () => <Signup />
    }
];

const privateRoutes = [
    {
        path: "/dashboard",
        exact: true,
        main: () => <Dashboard />
    }
];

function AppRouter() {
    return (
        <Router>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "14%",
                        height: 1000,
                        background: "#f0f0f0"
                    }}
                >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                </div>

                <div style={{ flex: 1, padding: "10px" }}>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                    <Switch>
                        {privateRoutes.map((route, index) => (
                            <PrivateRoute
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default AppRouter;