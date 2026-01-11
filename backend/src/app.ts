import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import weatherRouter from "./routes/weatherRoute.js"

const app: express.Application = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


app.use("/api/v1/weather", weatherRouter);


export default app;