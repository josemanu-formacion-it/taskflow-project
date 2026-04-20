const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logger simple para ver qué pasa en la consola
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rutas
app.use('/api/v1/tasks', taskRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió muy mal en el servidor' });
});

// --- ESTO ERA LO QUE TENÍA ANTES ---
// app.listen(port, () => {
//    console.log(`🚀 Servidor TaskFlow corriendo en http://localhost:${port}`);
// });

// --- LO CAMBIO POR ESTO ---
// Si estoy en desarrollo local, escucho en el puerto. 
// Si estoy en Vercel, exporto la app para que se ejecute como función Serverless.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`🚀 Servidor TaskFlow corriendo en http://localhost:${port}`);
    });
}

module.exports = app;