

const grpc = require("@grpc/grpc-js");
const { ReflectionService } = require('@grpc/reflection');
const path = require('path');
const PROTO_PATH = path.join(__dirname, '../proto/course_category.proto');
var protoLoader = require('@grpc/proto-loader');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}


const main = async () => {
    try {
        const CategoryService = require('../internal/services/category');
        var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
        const categoryProto = grpc.loadPackageDefinition(packageDefinition)
        const server = new grpc.Server();
        server.addService(categoryProto.CategoryService.service, {
            ListCategories: async (call, callback) => {
                console.log('ListCategories');
                try {
                    const categories = await CategoryService.ListAllCategory();
                    callback(null, { categories });
                } catch (err) {
                    console.log(err);
                    callback({
                        code: grpc.status.INTERNAL,
                        details: 'Internal server error'
                    });
                }
            },
            CreateCategory: async (call, callback) => {
                console.log('CreateCategory');
                const { name, description } = call.request;
                try {
                    const category = await CategoryService.CreateCategory(name, description);
                    callback(null, category);
                } catch (err) {
                    console.log(err);
                    callback({
                        code: grpc.status.INTERNAL,
                        details: 'Internal server error'
                    });
                }
            },
            CreateCategoryStream: async (call, callback) => {
                console.log('CreateCategoryStream');
                const categories = [];
                call.on('data', async (category) => {
                    try {
                        const categoryCreated = await CategoryService.CreateCategory(category.name, category.description);
                        categories.push(categoryCreated);
                        // call.write(categoryCreated);
                    } catch (err) {
                        console.log(err);
                        call.write({
                            code: grpc.status.INTERNAL,
                            details: 'Internal server error'
                        });
                    }
                });
                call.on('end', () => {
                    callback(null, { categories });
                });

            },
            CreateCategoryStreamBidirectional: async (call, callback) => {
                console.log('CreateCategoryStreamBidirectional');
                call.on('data', async (category) => {
                    try {
                        const categoryCreated = await CategoryService.CreateCategory(category.name, category.description);
                        call.write(categoryCreated);
                    } catch (err) {
                        console.log(err);
                        call.write({
                            code: grpc.status.INTERNAL,
                            details: 'Internal server error'
                        });
                    }
                });
                call.on('end', () => {
                    call.end();
                });
            }
        })
        const reflection = new ReflectionService(packageDefinition);
        reflection.addToServer(server);
        server.bindAsync(
            'localhost:50051',
            grpc.ServerCredentials.createInsecure(),
            (err, port) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Server running at http://localhost:${port}`);
                server.start();
            }
        );
    } catch (err) {
        console.log(err);
    }
}

main();