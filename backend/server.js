// server.js (JavaScript)
const express = require('express');
const cron = require('node-cron');
const { syncNoticias } = require('./controllers/recursController');

const app = express();

app.use(express.json());

// Rutas originales
app.use('/api', require('./routes/recursRoutes'));

// [Opcional] Endpoint de prueba manual para invocar la sincronización
app.get('/api/test-sync', async (req, res) => {
    try {
        await syncNoticias(req, res);
    } catch (error) {
        console.error('Error en el endpoint de prueba:', error);
        res.status(500).json({ error: 'Error en la sincronización manual.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

// Configuración de la tarea programada para pruebas: se ejecuta cada minuto
// Durante la fase de comprobación se cambia temporalmente la expresión cron.
cron.schedule(
    '* 10 * * *',
    async () => {
        try {
            console.log('Iniciando la sincronización programada de prueba.');
            // Se utiliza un objeto dummy para req y res para capturar el resultado en consola
            const reqDummy = {}; // Puedes incluir datos si fuese necesario
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