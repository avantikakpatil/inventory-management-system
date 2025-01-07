const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "inventory_management",
    password: "admin",
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;