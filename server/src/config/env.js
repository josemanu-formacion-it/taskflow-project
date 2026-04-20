require('dotenv').config();

const config = {
    port: process.env.PORT || 3000
};

if (!process.env.PORT) {
    console.error("⚠️  ¡CUIDADO! PORT no definido en .env, usando 3000 por defecto.");
}

module.exports = config;