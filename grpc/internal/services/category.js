const category = require('../database/category');

class CategoryService {
    static async ListAllCategory() {
        try {
            return await category.list();
        } catch (err) {
            console.log(err);
        }
    }

    static async CreateCategory(name, description) {
        try {
            return await category.create(name, description);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CategoryService;