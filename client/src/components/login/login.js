import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');
    const navigateTo = useNavigate();

    const handleLogin = () => {
        Axios.post('http://localhost:3001/api/login', {
            loginUsername: loginUsername,
            loginPassword: loginPassword,
        })
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'User not found' || loginUsername === '' || loginPassword === '') {
                    console.log(response.data.message);
                    setLoginStatus(`Wrong username ore password`);
                } else if (response.data.message === 'Login successful') {
                    navigateTo('/add-product');
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error.message);
            });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleLogin();
        setLoginUsername();
    };

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
                setLoginStatus('');
            }, 3000);
        }
    }, [loginStatus]);

    return (
        <div>
            <h3>Login</h3>
            <div>
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <span className={statusHolder}>{loginStatus}</span>
                        <br />
                        <label>Username:</label>
                        <input type='text' placeholder='Enter username' onChange={(event) => { setLoginUsername(event.target.value) }} />
                        <br />
                        <label>Password:</label>
                        <input type='password' placeholder='Enter password' onChange={(event) => { setLoginPassword(event.target.value) }} />
                        <br />
                        <button type='submit'>
                            <span>Login</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
