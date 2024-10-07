const express = require('express');
var { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema } = require('graphql');
var { ruruHTML } = require("ruru/server")
const CategoryService = require('../internal/service/category');
const CourseService = require('../internal/service/course');

const schema = buildSchema(`
    type Category{
        id: ID!
        name: String!
        description: String
        courses: [Course!]!
    }    
    
    type Course{
        id: ID!
        name: String!
        description: String
        category: Category!
    }
    
    input CategoryInput{
        name: String!
        description: String
    }

    input CourseInput{
        name: String!
        description: String
        categoryId: ID!
    }
    
    type Query{
        categories: [Category]
        courses: [Course]
        hello: String
    }


    type Mutation{
        createCategory(input: CategoryInput): Category
        updateCategory(id: ID!, input: CategoryInput): Category
        createCourse(input: CourseInput): Course

    }
`);

const app = express();


const resolvers = {
    categories: async (data) => {
        try {
            return await CategoryService.listAllCategory();
        } catch (err) {
            throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
        }
    },
    createCategory: async (data) => {
        try {
            return await CategoryService.createCategory(data);
        } catch (err) {
            throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
        }
    },
    updateCategory: async (data) => {
        try {
            console.log(data);
            return await CategoryService.updateCategory(data);
        } catch (err) {
            throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
        }
    },
    courses: async (data) => {
        try {
            console.log(data)
            return await CourseService.listAllCourses();
        } catch (err) {
            throw new Error(`Ocorreu um erro ao buscar os cursos: ${err}`);
        }
    },
    createCourse: async (data) => {
        try {
            return await CourseService.createCourse(data);
        } catch (err) {
            throw new Error(`Ocorreu um erro ao buscar os cursos: ${err}`);
        }
    }
}


app.all(
    "/graphql",
    createHandler({
        schema,
        rootValue: resolvers,
        graphiql: true,
    })
)

app.get("/", (_req, res) => {
    res.type("html")
    res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');