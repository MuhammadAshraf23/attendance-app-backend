const cors = require('cors');
const express = require('express');
const mongoose = require('./database/db');
const dotenv = require('dotenv');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const studentRouter = require('./routes/student')

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/images',express.static('images'))
// Use the routers
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/students', studentRouter);

app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});