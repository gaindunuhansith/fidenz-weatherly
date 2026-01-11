import type { Request, Response } from "express"
import { getCityCodes, getWeatherByCityCode } from "../services/weatherService.js"

interface WeatherData {
    cityName: string;
    weatherDescription: string;
    temperature: number;
    comfortScore: number;
}

interface WeatherResult {
    data: WeatherData;
    cacheStatus: 'HIT' | 'MISS';
    rank?: number;
}

export const getWeatherData = async(req: Request, res: Response) => {
    
    try {
        const cities = getCityCodes();


        const results: WeatherResult[] = [];
        
        for (const city of cities){
            const cityResult = await getWeatherByCityCode(Number(city.CityCode));
            if (cityResult) {
                results.push(cityResult);
            } else {
                console.log(`No weather data for the city code: ${city.CityCode}`)
            }
        }

        //sort according to the comfort score(high to low) and give a rank
        results.sort((a, b) => b.data.comfortScore - a.data.comfortScore);

        results.forEach((item, index) => {
            item.rank = index + 1;
        });

        
        res.status(200).json({ "weather data": results});
    } catch (error) {
        res.status(500).json({ error: "Internal server error"});
    }  
}