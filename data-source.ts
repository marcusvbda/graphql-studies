import 'reflect-metadata';
require('dotenv').config();
import { DataSource, ObjectLiteral, Repository } from 'typeorm';

interface IENV {
    [key: string]: any;
}

const { DB_HOST, DB_TYPE, DB_USER, DB_PASSWORD, DB_NAME } =
    process.env as unknown as IENV;

const dataSource = new DataSource({
    type: DB_TYPE as any,
    url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    migrations: [],
    subscribers: [],
});

export const AppDataSource = dataSource.initialize();

export const makeRepository = async <T extends ObjectLiteral>(
    entity: any
): Promise<Repository<T>> => {
    const repository = await (await AppDataSource).getRepository(entity);
    return repository as Repository<T>;
};
