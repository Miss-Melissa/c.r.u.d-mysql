import React, { useEffect, useState } from 'react';
import Register from '../../components/register/register'; // Adjust the path accordingly
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [statusHolder, setStatusHolder] = useState('message');
  const navigateTo = useNavigate();

  useEffect(() => {
    if (emailError !== '' || usernameError !== '' || passwordError !== '') {
        setStatusHolder('showMessage');
        setTimeout(() => {
            setStatusHolder('message');
            setEmailError('');
            setUsernameError('');
            setPasswordError('');
        }, 4000);
    }
}, [emailError, usernameError, passwordError]);

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
        if (errorMessage === 'User added successfully') {
          navigateTo('/login');
        }
        if (errorMessage === 'This email already exists') {
          setEmailError(errorMessage);
          setUsernameError('');
        } else if (errorMessage === 'This username already exists') {
          setUsernameError(errorMessage);
          setEmailError('');
        } else {
          setEmailError(errorMessage);
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
      <Register 
      handleFormSubmit={handleFormSubmit} 
      emailError={emailError} 
      usernameError={usernameError} 
      passwordError={passwordError} 
      statusHolder={statusHolder} />
    </div>
  );
}

export default RegisterPage;
