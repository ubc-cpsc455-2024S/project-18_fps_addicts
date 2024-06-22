import React, {useEffect, useState} from 'react';
import '../App.css';
import {useDispatch, useSelector} from "react-redux";
import {setLoginState} from "../redux/pages/service.js";

const Login = () => {
    const dispatch = useDispatch();
    const title = useSelector((state) => state.login.title);

    useEffect(() => {
        dispatch(setLoginState('Login'));
    }, [dispatch]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <h1>{title}</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="login-input"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login-input"
            />
            <button className="login-button">Login</button>
        </div>
    );
};

export default Login;
