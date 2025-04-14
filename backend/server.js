// server.js (JavaScript)
const express = require('express');
const cron = require('node-cron');
const { syncNoticias } = require('./controllers/recursController');

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