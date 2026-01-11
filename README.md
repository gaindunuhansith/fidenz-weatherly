# Weatherly

Weather app with Auth0 login that shows comfort scores for different cities.

## Setup

### Environment Variables

Backend `.env`:
```
PORT=5000
WEATHER_API_KEY=your_api_key
```

Frontend `.env`:
```
VITE_AUTH0_DOMAIN=your_domain
VITE_AUTH0_CLIENT_ID=your_client_id
```

### Run Locally

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontned
npm install
npm run dev
```

## Comfort Index Formula

Comfort score measures how close weather is to ideal conditions (22°C, 45% humidity, no wind):

```
score = 100 - (tempDiff × 1.5) - (humidityDiff × 0.4) - (windDiff × 0.1)
```

### Why These Weights?

Temperature gets the highest weight (1.5) because it's what people notice first. A few degrees off feels significant.

Humidity matters but less (0.4). You feel it, but it's not as immediate as temperature.

Wind speed has minimal impact (0.1) unless it's really strong. Light breezes don't affect comfort much.

## Trade-offs

**Formula simplicity**: Used linear deviations instead of heat index calculations. Easier to understand and debug, though less accurate in extreme conditions.

**Caching**: Weather updates every 5 minutes max. Cuts down API costs but means data can be slightly stale. Worth it since weather doesn't change that fast anyway.

**In-memory cache**: Fast but dies when server restarts. Should switch to Redis for production.

**Fixed city list**: Only shows predefined cities. Could let users search but adds complexity.


## Cache Design

Using node-cache with 5-minute TTL. Each city code is a cache key.

Weather data doesn't change often, so caching makes sense. Saves API calls and speeds up responses. Response includes `HIT` or `MISS` to track cache effectiveness.

Would swap to Redis for production to keep cache across restarts.


## Known Limitations

- No retry logic if weather API fails
- Cache doesn't survive server restarts
- Comfort formula assumes everyone likes 22°C (not customizable)
- No offline mode
