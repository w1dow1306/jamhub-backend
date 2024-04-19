const mysql = require('mysql');
const config = require('../config/server-config.json');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.sql.dbhost,
    user: config.sql.dbuser,
    password: config.sql.dbpass,
    database: 'test'
});

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
};

module.exports = { query };