import fs from "fs";
import env from "../config/env.js"
import axios from "axios";
import weatherCache from "../config/cache.js";
import calculateComfortScore from "./comfortService.js";


export const getCityCodes = () => {
    try {
        const data = fs.readFileSync("./src/cities.json", "utf8");
        const parsedData = JSON.parse(data);

        return parsedData.List;
    } catch (error) {
        console.log("Error reading cities.json: ", error);
    }
}

export const getWeatherByCityCode = async(cityCode: number) => {

    const cachedData = weatherCache.get(cityCode);
    if(cachedData) {
        console.log("Cache HIT");
        return {
            data: cachedData,
            cacheStatus: 'HIT'
        };
    }


    console.log("Cache MISS");
    const API_KEY = env.OPEN_WEATHER_MAP_API_KEY;
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;


    try {
        const result = await axios.get(URL);

        const temperature = (result.data.main.temp - 273.15);

        const comfortScore = calculateComfortScore({
            temperature: temperature,
            humidity: result.data.main.humidity,
            windSpeed: result.data.wind.speed,
        });

        const weatherData = {
            cityName: result.data.name,
            weatherDescription: result.data.weather[0].description,
            temperature: temperature,
            comfortScore: comfortScore
        }


        weatherCache.set(cityCode, weatherData);
        
        return {
            data: weatherData,
            cacheStatus: "MISS"
        };
    } catch (error) {
        console.log("Error fetching wather data: ", error);
        throw error;
    }  
}