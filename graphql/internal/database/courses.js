const uuid = require('uuid');
const db = require('./index');

class Courses {

    static listAll() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM courses', (err, rows) => {
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
            db.get('SELECT * FROM courses WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static listAllByCourseId(categoryId) {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM courses WHERE categoryId = ?', [categoryId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static create(name, description, categoryId) {
        const id = uuid.v4();
        return new Promise((resolve, reject) => {
            db.run('INSERT INTO courses (id, name, description, categoryId) VALUES (?, ?, ?, ?)', [id, name, description, categoryId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, name, description, categoryId });
                }
            });
        });
    }

    static update(id, name, description, categoryId) {
        return new Promise((resolve, reject) => {
            db.run('UPDATE courses SET name = ?, description = ?, categoryId = ? WHERE id = ?', [name, description, categoryId, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, name, description, categoryId });
                }
            });
        });
    }

}

module.exports = Courses;