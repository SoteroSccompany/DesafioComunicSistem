const category = require('../database/category');
const courses = require('./course')

class Category {
    static async listAllCategory() {
        try {
            return await category.listAll();
        } catch (err) {
            console.log(err);
        }
    }

    static async createCategory(input) {
        try {
            return await category.create(input.name, input.description);
        } catch (err) {
            console.log(err);
        }
    }

    static async listCategoryById(id) {
        try {
            return await category.listById(id);
        } catch (err) {
            console.log(err);
        }
    }

    static async updateCategory({ id, input }) {
        try {
            const checkIfCategoryExists = await category.listById(id);
            if (!checkIfCategoryExists) {
                throw new Error('Category not found');
            }
            return await category.update(id, input.name, input.description);
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Category;