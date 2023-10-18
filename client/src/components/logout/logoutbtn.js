import Axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const navigateTo = useNavigate();


    const handleLogout = () => {
        Axios.post('http://localhost:3001/api/logout')
            .then((response) => {
                console.log(response);
                navigateTo('/login');
            })
            .catch((error) => {
                console.error('Error logging out:', error.message);
            });
    };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutBtn;
