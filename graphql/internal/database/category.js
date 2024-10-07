const uuid = require('uuid');
const db = require('./index');

class Category {

    static listAll() {
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

    static listById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM categories WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
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

    static update(id, name, description) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id], (err) => {
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