import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div>
            <h3>Register</h3>
            <div>
                <form>
                    <label>Email</label>
                    <input type='email' placeholder='Enter Email' />
                    <br />
                    <label>Username</label>
                    <input type='text' placeholder='Enter username' />
                    <br />
                    <label>Password:</label>
                    <input type='text' placeholder='Enter password' />
                    <br />
                    <button type='submit'>
                        <span>Register</span>
                    </button>
                </form>
            </div>
            <div>
                <span>Have an account? <Link to="/login"><button>Login</button></Link></span>
            </div>
        </div>
    );
}

export default Register;
