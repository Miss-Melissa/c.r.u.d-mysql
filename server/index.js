const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require("./routes/router");


const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use("/uploads", express.static("./uploads"));
app.use(router)


app.listen(3001, () => {
  console.log('Running on port 3001!');
});