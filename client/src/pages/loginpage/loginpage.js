import React from 'react';
import Login from '../../components/login/login'
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <div>
      <Login />
      </div>
      <span>Forget your password? <Link to=''>Click here</Link></span>
      <div>
        <span>Don't have an account?</span> <Link to='/register'><button>Register</button></Link>
      </div>
    </div>
  );
}

export default LoginPage;
