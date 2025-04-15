// app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/recursos', require('./routes/recursRoutes'));
app.use('/api/test', testRoutes);


module.exports = app;
