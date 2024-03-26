import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import IndexRouter from "./routes/index";
import { AppDataSource } from "./configs/postgres";
import "reflect-metadata";
import { errorHandler } from "./middleware/error";
import { addMockData } from "./seeders";

export class ExpressLoader {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;
    }

    initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors({ origin: "*" }));
        this.app.use("/", IndexRouter);
        this.app.use(errorHandler)
    }

    listen() {
        try {
            this.app.listen(this.port, async () => {
                await AppDataSource.initialize();
                await addMockData()
                console.log(`App listening on port ${this.port}`);
            });
        } catch (error) {
            console.log(error);
        }
    }
}
