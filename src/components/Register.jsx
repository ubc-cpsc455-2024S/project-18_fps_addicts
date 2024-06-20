import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/register', { email, password });
    //         setMessage(response.data.message);
    //     } catch (error) {
    //         setMessage(error.response.data.message);
    //     }
    // };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
