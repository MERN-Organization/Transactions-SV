const express = require('express');
const app = express();
const port = 3001;
const apiRoutes = require('./routes/apiRoutes');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();
var cookieParser = require('cookie-parser');

app.use(express.json());

connectDB();

app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('API IS RUNNING.....');
});

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
