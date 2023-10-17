import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleFormSubmit, emailError, usernameError, passwordError }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleFormSubmit(event, email, username, password);
    };

    return (
        <div>
            <h3>Register</h3>
            <div>
                <form onSubmit={onSubmit}>
                    {emailError && <small style={{ color: 'red' }}>{emailError}</small>}
                    <br />
                    <label>Email</label>
                    <input type="email" placeholder="Enter Email"  onChange={handleEmailChange} />
                    <br />
                    {usernameError && <small style={{ color: 'red' }}>{usernameError}</small>}
                    <br />
                    <label>Username</label>
                    <input type="text" placeholder="Enter username" onChange={handleUsernameChange} />
                    <br />
                    {passwordError && <small style={{ color: 'red' }}>{passwordError}</small>}
                    <br />
                    <label>Password:</label>
                    <input type="password" placeholder="Enter password" onChange={handlePasswordChange} />
                    <br />
                    <button type="submit">
                        <span>Register</span>
                    </button>
                </form>
            </div>
            <div>
                <span>
                    Have an account? <Link to="/login"><button>Login</button></Link>
                </span>
            </div>
        </div>
    );
}

export default Register;
