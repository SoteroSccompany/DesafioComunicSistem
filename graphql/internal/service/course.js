const course = require('../database/courses');
const category = require('./category');
const uuid = require('uuid');

class Course {

    static async listAllCourses() {
        try {
            return await course.listAll();
        } catch (err) {
            console.log(err);
        }
    }

    static async listAllByCategoryId(categoryId) {
        try {
            return await course.listAllByCourseId(categoryId);
        } catch (err) {
            console.log(err);
        }
    }



    static async createCourse({ input }) {
        try {
            const checkIfCategoryExists = await category.listCategoryById(input.categoryId);
            if (!checkIfCategoryExists) {
                throw new Error('Category not found');
            }
            return await course.create(input.name, input.description, input.categoryId);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async listCourseById(id) {
        try {
            return await course.listById(id);
        } catch (err) {
            console.log(err);
        }
    }

    static async updateCourse({ id, input }) {
        try {
            const checkIfCourseExists = await course.listById(id);
            if (!checkIfCourseExists) {
                throw new Error('Course not found');
            }
            return await course.update(id, input.name, input.description, input.categoryId);
        } catch (err) {
            throw new Error(err);
        }
    }



}

module.exports = Course;