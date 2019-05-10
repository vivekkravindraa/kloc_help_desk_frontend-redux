import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from '../dashboard/privateroute/PrivateRoute';

import Dashboard from '../dashboard/Dashboard';
import Landing from './Landing';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import Confirmation from '../auth/Confirmation';

import Admin from '../dashboard/users/Admin';
import Customer from '../dashboard/users/Customer';
import Moderator from '../dashboard/users/Moderator';

const routes = [
    { path: "/", exact: true, main: () => <Landing /> },
    { path: "/login", exact: true, main: () => <Login /> },
    { path: "/signup", exact: true, main: () => <Signup /> },
    { path: "/confirmation", exact: true, main: () => <Confirmation /> }
];

const privateRoutes = [
    { path: "/dashboard", exact: true, main: () => <Dashboard /> },
    { path: "/admin", exact: true, main: () => <Admin /> },
    { path: "/customer", exact: true, main: () => <Customer /> },
    { path: "/moderator", exact: true, main: () => <Moderator /> }
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
