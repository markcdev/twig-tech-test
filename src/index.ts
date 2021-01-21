import express from 'express';

import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { GroupArrayElementsResolver } from './resolvers';

const main = async () => {
    const app = express();

    configureApollo(app);

    app.listen(4000, () => {
        console.log('server started on http://localhost:4000/graphql');
    });
}

const configureApollo = async (app: any) => {
    const apolloServer  = new ApolloServer({
        schema: await buildSchema({
            resolvers: [GroupArrayElementsResolver],
            validate: false,
        })
    });

    apolloServer.applyMiddleware({ app} );
}

main().catch((error) => {
    console.log(error)
});

