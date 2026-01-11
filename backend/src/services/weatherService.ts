import fs from "fs";
import env from "../config/env.js"
import axios from "axios";


export const getCityCodes = () => {
    try {
        const data = fs.readFileSync("./src/cities.json", "utf8");
        const parsedData = JSON.parse(data);

        return parsedData.List;
    } catch (error) {
        console.log("Error reading cities.json: ", error);
    }
}

export const getWeatherByCityCode = async(code: number) => {
    const API_KEY = env.OPEN_WEATHER_MAP_API_KEY;
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?id=${code}&appid=${API_KEY}`;


    try {
        const result = await axios.get(URL);
        
        return result;
    } catch (error) {
        console.log("Error fetching wather data: ", error);
        throw error;
    }  
}