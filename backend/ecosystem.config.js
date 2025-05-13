module.exports = {
  apps: [
    {
      name: "api",
      script: "server.js", // o 'index.js' si ese es tu entrypoint

      // Configuración general
      instances: 1,
      exec_mode: "fork",
      watch: false, // pon en true si es dev y quieres autorecarga
      autorestart: true,
      max_restarts: 5,
      max_memory_restart: "200M",

      // Variables de entorno
      env: {
        NODE_ENV: "production",
        PORT: 3001
      },

      // Logs (opcional)
      error_file: "~/.pm2/logs/api-error.log",
      out_file: "~/.pm2/logs/api-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};
