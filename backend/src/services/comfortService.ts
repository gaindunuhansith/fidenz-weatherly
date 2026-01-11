type WeatherData = {
    temperature: number;
    windSpeed: number;
    humidity: number;
}

const calculateComfortScore = (weatherData: WeatherData) => {

    //calculating the comfort score using the deviation of the temperature, humidity and wind speed to it's ideal values.
    const idealTemperature = 22;
    const idealHumidity = 0.45;
    const idealWind = 0;

    const tempScore = Math.abs(idealTemperature - weatherData.temperature);
    const humidScore = Math.abs(idealHumidity - weatherData.humidity);
    const windScore = Math.abs(idealWind - weatherData.windSpeed);

    //for comfort the temperature contributes the most, then humidity and at last wind speed.
    //When calculating the the comfort score we will allocate weight to each scores accordingly

    const comfortScore = 100 - (tempScore * 1.5) - (humidScore * 0.4) - (windScore * 0.1);

    return Math.max(0, Math.min(100, Math.round(comfortScore)));
}

export default calculateComfortScore;