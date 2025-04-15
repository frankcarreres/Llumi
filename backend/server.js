// server.js
const cron = require('node-cron');
const app = require('./app'); // Importa la app configurada
const { syncNoticias } = require('./controllers/recursController');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
