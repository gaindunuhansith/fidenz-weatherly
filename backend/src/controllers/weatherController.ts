import type { Request, Response } from "express"
import { getCityCodes, getWeatherByCityCode } from "../services/weatherService.js"

export const getWeatherData = async(req: Request, res: Response) => {
    
    try {
        const cities = getCityCodes();
        console.log(cities);

        const results = [];
        
        for (const city of cities){
            console.log(city);
            const cityResult = await getWeatherByCityCode(Number(city.CityCode));
            if (cityResult) {
                results.push(cityResult);
            } else {
                console.log(`No weather data for the city code: ${city.CityCode}`)
            }
        }
        
        res.status(200).json({ "weather data": results});
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }  
}