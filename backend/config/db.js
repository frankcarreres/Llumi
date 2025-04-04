const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("llumi", "root", "1692004", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.authenticate()
  .then(() => console.log("Conectado a MySQL"))
  .catch(err => console.error("Error de conexión a MySQL:", err));

module.exports = sequelize;
