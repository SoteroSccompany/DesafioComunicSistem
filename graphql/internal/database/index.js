const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Abrir conexão com o banco de dados SQLite
const dbPath = path.resolve(__dirname, '../../database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Exportar a conexão para que outros arquivos possam usá-la
module.exports = db;
