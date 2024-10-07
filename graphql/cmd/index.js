
const CategoryService = require('../internal/service/category');
const CourseService = require('../internal/service/course');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const schema = require('../schema');



// const app = express();

const resolvers = {
    Query: {
        categories: async (data) => {
            try {
                return await CategoryService.listAllCategory();
            } catch (err) {
                throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
            }
        },
    },
    Mutation: {
        createCategory: async (_, { input }) => {
            try {
                return await CategoryService.createCategory(input);
            } catch (err) {
                console.log(err)
                throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
            }
        },
        updateCategory: async (parent, { input, id }) => {
            try {
                return await CategoryService.updateCategory({ id, input });
            } catch (err) {
                throw new Error(`Ocorreu um erro ao buscar as categorias: ${err}`);
            }
        }
    },
    Category: {
        courses: async (category) => {
            try {
                return await CourseService.listAllByCategoryId(category.id);
            } catch (err) {
                throw new Error(`Ocorreu um erro ao buscar os cursos: ${err}`);
            }
        }
    }
}

const main = async () => {
    const server = new ApolloServer({ typeDefs: schema, resolvers });
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 4000
        }
    })

    console.log(`Server ready at ${url}`);
}

main();
