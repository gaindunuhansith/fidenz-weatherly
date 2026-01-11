import fs from "fs";
import env from "../config/env.js"
import axios from "axios";
import weatherCache from "../config/cache.js";


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
            status: 'HIT'
        };
    }


    console.log("Cache MISS");
    const API_KEY = env.OPEN_WEATHER_MAP_API_KEY;
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}`;


    try {
        const result = await axios.get(URL);


        weatherCache.set(cityCode, result.data);
        
        return result;
    } catch (error) {
        console.log("Error fetching wather data: ", error);
        throw error;
    }  
}