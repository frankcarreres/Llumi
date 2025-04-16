// app.js
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const recursRoutes = require('./routes/recursRoutes');

const app = express();
app.use(cors());
app.use(express.json());
// const typebotRoutes = require('./routes/typebotRoutes');

// 👇 Aquí registras todas las rutas
app.use('/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/recursos', recursRoutes); // Incluye /recursos/syncNoticias y /recursos/noticias
// app.use('/api/typebot', typebotRoutes);

module.exports = app;
