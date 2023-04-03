const express = require('express');
const app = express();
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');

app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

module.exports = app;
