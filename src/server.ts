import 'reflect-metadata';
require('dotenv').config();
import { buildSchema } from 'type-graphql';
import path from 'path';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import { AppDataSource } from '../data-source';

interface BaseContext {
    dataSource?: string;
}

const port = parseInt(process.env?.PORT || '4000');

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [path.join(__dirname, '/**/*.resolver.{js,ts}')],
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    } as any);

    const server = new ApolloServer<BaseContext>({
        schema,
    });
    ('');

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const dataSource = await AppDataSource;
            return { dataSource };
        },
        listen: { port },
    });

    console.log(`🚀 Server listening at: ${url}`);
}

bootstrap();
