import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Loadable from '../components/Loadable';

const Login = Loadable(lazy(() => import('../pages/Auth/Login')));
const Register = Loadable(lazy(() => import('../pages/Auth/Register')));
const LoginRoute = () => {


    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
};

export default LoginRoute;