import React from 'react';
import {
    createBrowserRouter,
} from "react-router-dom";
import Main from '../layout/main';
import Home from '../pages/Home';
import Profile from '../pages/profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';

const Route = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <PrivateRoute>
                    <Home></Home>
                </PrivateRoute>
            },
            {
                path: "/profile",
                element: <PrivateRoute>
                    <Profile></Profile>
                </PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ]
    },
]);



export default Route;