import { constants } from '../constants';
import { DataSource, DataSourceOptions } from 'typeorm';

export const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: constants.DB_HOST,
    port: parseInt(constants.DB_PORT),
    username: constants.DB_USERNAME,
    password: constants.DB_PASSWORD,
    database: constants.DB_NAME,
    entities: ['dist/modules/**/*.entity.{js,ts}'],
    migrations: ['dist/database/migrations/*.{js,ts}'],
    migrationsTableName: 'migration',
    synchronize: false,
    logger: 'file'
};

export const dataSource = new DataSource(databaseConfig);
