const db = require('../../db/conn');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// --- User --- 

const registerUser = (req, res) => {
    const { email, username, password } = req.body;

    if (!email) {
        return res.json({ message: 'Email cannot be empty' });
    }

    if (!username) {
        return res.json({ message: 'Username cannot be empty' });
    }

    if (!password) {
        return res.json({ message: 'Password cannot be empty' });
    }

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ message: 'Error creating user' });
        }

        const sqlRegister = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
        const values = [email, username, hashedPassword];

        db.query(sqlRegister, values, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    if (err.sqlMessage.includes('email')) {
                        return res.json({ message: 'This email already exists' });
                    } else if (err.sqlMessage.includes('username')) {
                        return res.json({ message: 'This username already exists' });
                    }
                } else {
                    console.error('Error inserting user:', err);
                    return res.json({ message: 'User addition failed' });
                }
            } else {
                console.log('User added successfully:', result);
                return res.status(201).json({ message: 'User added successfully' });
            }
        });
    });
};


const loginUser = (req, res) => {
    const sentLoginUsername = req.body.loginUsername;
    const sentLoginPassword = req.body.loginPassword;

    const sqlLogin = "SELECT * FROM users WHERE username = ? LIMIT 1";
    const values = [sentLoginUsername];

    db.query(sqlLogin, values, (err, results) => {
        if (err) {
            res.json({ error: 'Internal server error' });
        } else {
            if (results.length > 0) {
                const storedPassword = results[0].password;
                bcrypt.compare(sentLoginPassword, storedPassword, (error, result) => {
                    if (result) {
                        req.session.user = sentLoginUsername; 
                        res.cookie('loggedIn', true, { httpOnly: true });
                        res.json({ message: 'Login successful' });
                    } else {
                        res.json({ message: 'Credentials do not match' });
                    }
                });
            } else {
                res.json({ message: 'User not found' });
            }
        }
    });
};


const logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ error: 'Error logging out' });
            } else {
                console.log('Session destroyed successfully');
                res.clearCookie('loggedIn');
                res.json({ message: 'Logout successful' });
            }
        });
    } else {
        console.warn('No active session found');
        res.status(400).json({ error: 'No active session found' });
    }
};


module.exports = {
registerUser,
loginUser,
logoutUser
  };