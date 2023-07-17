import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import path from 'path';
import { DataSource } from 'typeorm';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [path.join(__dirname, '/**/*.resolver.{js,ts}')],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    } as any);
    const server = new ApolloServer({
        schema,
    });

    const { url } = await startStandaloneServer(server, {
        context: async ({ req, res }) => {
            const dataSource = await DataSource;
            return { req, res, dataSource };
        },
    });

    console.log(`🚀 Server listening at: ${url}`);
}

bootstrap();
