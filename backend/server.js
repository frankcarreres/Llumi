const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json()); 

// Endpoint para comprobar conexión a la base de datos
app.get("/test-db", async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({ message: "Conexión a la base de datos exitosa" });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        res.status(500).json({ error: "No se pudo conectar a la base de datos" });
    }
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
