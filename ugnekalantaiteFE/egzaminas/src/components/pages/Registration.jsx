import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [registerError, setRegisterError] = useState({ badUsername: '', badEmail: '', badPassword: '' });
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setRegisterError(prevState => ({ ...prevState, badPassword: 'Passwords do not match' }));
            return;
        }
        if (formData.username.trim() === '') {
            setRegisterError(prevState => ({ ...prevState, badUsername: 'Username cannot be empty' }));
            return;
        }
        if (formData.password.trim() === '') {
            setRegisterError(prevState => ({ ...prevState, badPassword: 'Password cannot be empty' }));
            return;
        }
        if (formData.email.trim() === '') {
            setRegisterError(prevState => ({ ...prevState, badEmail: 'Email cannot be empty' }));
            return;
        }
        if (formData.confirmPassword.trim() === '') {
            setRegisterError(prevState => ({ ...prevState, badPassword: 'Confirm Password cannot be empty' }));
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                const registerError = error.response.data.message.toLowerCase();
                if (registerError.includes("username")) {
                    setRegisterError(prevState => ({ ...prevState, badUsername: error.response.data.message }));
                } else if (registerError.includes("password")) {
                    setRegisterError(prevState => ({ ...prevState, badPassword: error.response.data.message }));
                } else if (registerError.includes("email")) {
                    setRegisterError(prevState => ({ ...prevState, badEmail: error.response.data.message }));
                } else {
                    setRegisterError(prevState => ({ ...prevState, badUsername: error.response.data.message }));
                }
            }
        }
    };

    return (
        <div className="wrapper">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <div className="input-box">
                    <input
                        className={registerError.badUsername ? "bad-input" : ""}
                        type="text"
                        id="username"
                        name="username"
                        placeholder='Enter your username'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <span className="error-message">{registerError.badUsername}</span>
                </div>

                <label htmlFor="email">Email</label>
                <div className="input-box">
                    <input
                        className={registerError.badEmail ? "bad-input" : ""}
                        type="text"
                        id="email"
                        name="email"
                        placeholder='Enter your email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <span className="error-message">{registerError.badEmail}</span>
                </div>

                <label htmlFor="password">Password</label>
                <div className="input-box">
                    <input
                        className={registerError.badPassword ? "bad-input" : ""}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span className="error-message">{registerError.badPassword}</span>
                </div>

                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-box">
                    <input
                        className={registerError.badPassword ? "bad-input" : ""}
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn">Register</button>

                <div className="login-link">
                    <p>Already have an account? <a href="../Login">Login</a></p>
                </div>
            </form>
        </div>
    );
};

export default Registration;
