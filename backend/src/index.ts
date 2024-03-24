import "reflect-metadata";
import { envConfig } from "./configs/env";
import { ExpressLoader } from "./app";

const PORT = envConfig.PORT;

const app = new ExpressLoader(PORT);

app.initializeMiddlewares();
app.listen()