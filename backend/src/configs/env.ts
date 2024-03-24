import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
    PORT: +(process.env.PORT || 8080),
    JWT_SECRET: process.env.JWT_SECRET || "mysecret",
    HOST: process.env.HOST || "localhost",
    DB_PORT: +(process.env.DB_PORT || 5432),
    USERNAME: "postgres",
    PASSWORD: process.env.PASSWORD || "psotgres",
    DATABASE: process.env.DATABSE || "cinema_db"
};
