// app.js
const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');
const recursRoutes = require('./routes/recursRoutes');
const typebotRoutes = require('./routes/typebotRoutes');
const denunciaRoutes = require('./routes/denunciaRoutes');

app.use(cors());
app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";
  if (contentType.includes("application/json")) {
    express.json({ limit: '10mb' })(req, res, next);
  } else {
    next();
  }
});


// 👇 Aquí registras todas las rutas
app.use('/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/recursos', recursRoutes);
app.use('/denuncias', denunciaRoutes);
app.use('/typebot', typebotRoutes);

module.exports = app;
