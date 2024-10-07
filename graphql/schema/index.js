const typeDefs = `
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
`;

module.exports = typeDefs;