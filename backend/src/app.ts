import express from "express";
import weatherRouter from "./routes/weatherRoute.js"

const app: express.Application = express();

app.use("/api/v1/weather", weatherRouter);


export default app;