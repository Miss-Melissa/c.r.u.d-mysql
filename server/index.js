const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require("./routes/router");
const session = require('express-session');

const app = express();

app.use(cors()); // Use cors with the defined options
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'secret', // Add a secret string here for session security
    resave: false,
    saveUninitialized: true
}));

app.use("/uploads", express.static("./uploads"));
app.use(router);

app.listen(3001, () => {
    console.log('Running on port 3001!');
});
