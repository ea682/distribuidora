require('dotenv').config();

const config = {
    dev: process.env.NODE_ENV !== "production",
    port : process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbDatabase: process.env.DB_NAMEBD
};

module.exports = { config };