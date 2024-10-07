const db = require('./index');
const uuid = require('uuid');
class Category {

    static list() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM categories', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static create(name, description) {
        const id = uuid.v4();
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO categories (id, name, description) VALUES (?, ?, ?)', [id, name, description], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, name, description });
                }
            });
        });
    }

}

module.exports = Category;