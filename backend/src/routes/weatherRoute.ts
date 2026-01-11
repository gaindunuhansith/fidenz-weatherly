import { Router } from "express";
import { getWeatherData } from "../controllers/weatherController.js";

const router = Router();

router.get("/", getWeatherData);

export default router;