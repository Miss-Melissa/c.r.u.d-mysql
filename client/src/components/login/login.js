import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <h3>Login</h3>
            <div>
                <div>
                    <form>
                        <span>Login status</span>
                        <br />
                        <label>Username:</label>
                        <input type='text' placeholder='Enter username' />
                        <br />
                        <label>Password:</label>
                        <input type='text' placeholder='Enter password' />
                        <br />
                        <button type='submit'>
                            <span>Login</span>
                        </button>
                    </form>
                </div>
                <div>
                    <span>Forget your password? <Link to="">Click here</Link></span>
                </div>
                <div><Link to="/add-product">Dashboard</Link></div>
            </div>
            <div>
                <span>Don't have an account?</span> <Link to="/register"><button>Register</button></Link>
            </div>
        </div>
    );
}

export default Login;
