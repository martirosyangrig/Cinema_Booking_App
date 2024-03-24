import { DataSource } from "typeorm";
import { envConfig } from "./env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envConfig.HOST,
    port: envConfig.DB_PORT,
    username: envConfig.USERNAME,
    password: envConfig.PASSWORD,
    database: "cinema_db",
    entities: ["src/entity/**/*{.ts,.js}"],
    migrations: ["src/migrations/**/*{.ts,.js}"],
    synchronize: false,
    logging: false,

});
