// server.js
const express = require('express');
const cors = require('cors'); // Importa el módulo cors
const { syncNoticias } = require('./controllers/recursController');

const app = express();

app.use(express.json());

// Configuración de CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Rutas
app.use('/recursos', require('./routes/recursRoutes'));

app.get('/recursos/syncNoticias', async (req, res) => {
    try {
        console.log('Ejecutando la sincronización...');
        await syncNoticias(req, res);
    } catch (error) {
        console.error('Error durante la sincronización:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});