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

const app= require('./app');
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// Configuración de la tarea programada para pruebas:
// Para ejecutar cada minuto ('* * * * *')
// Para ejecutar a las 10:00 ('* 10 * * *')
cron.schedule(
    '* 10 * * *',
    async () => {
        try {
            console.log('Iniciando la sincronización programada...');
            // Se utiliza un objeto dummy para req y res para capturar el resultado en consola
            const reqDummy = {};
            const resDummy = {
                json: (data) => console.log('Resultado:', data),
                status: (code) => ({
                    json: (data) => console.error(`Código ${code}:`, data),
                }),
            };

            await syncNoticias(reqDummy, resDummy);
        } catch (error) {
            console.error('Error en la sincronización programada de prueba:', error);
        }
    },
    {
        timezone: 'Europe/Madrid',
    }
);