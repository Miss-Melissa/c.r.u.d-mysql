import React, { useState } from 'react';
import Register from '../../components/register/register'; // Adjust the path accordingly
import Axios from 'axios';

function RegisterPage() {
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    const createUser = (email, username, password) => {
        if (!email) {
            setEmailError('Email cannot be empty');
            return;
          } else {
            setEmailError('');
          }
          if (!username) {
            setUsernameError('Username cannot be empty');
            return;
          } else {
            setUsernameError('');
          }
          if (!password) {
            setPasswordError('Password cannot be empty');
            return;
          } else {
            setPasswordError('');
          }
      
        Axios.post('http://localhost:3001/api/register', {
            email: email,
            username: username,
            password: password,
        })
            .then((response) => {
                const errorMessage = response.data.message;
                console.log(response.data.message)
                if (errorMessage === 'This email already exists') {
                    setEmailError(errorMessage);
                    setUsernameError('');
                } else if (errorMessage === 'This username already exists') {
                    setUsernameError(errorMessage);
                    setEmailError('');
                } else {
                    setEmailError('');
                    setUsernameError('');
                    setPasswordError('');
                }
            })
            .catch((error) => {
                console.error('Error creating user:', error.message);
            });
    };



    const handleFormSubmit = (event, email, username, password) => {
        event.preventDefault(); // Prevent the default form submission behavior
        createUser(email, username, password); // Call the createUser function with the form data
    };

    return (
        <div>
            <Register handleFormSubmit={handleFormSubmit} emailError={emailError} usernameError={usernameError} passwordError={passwordError} />
        </div>
    );
}

export default RegisterPage;
