import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
    PORT: z.coerce.number(),
    OPEN_WEATHER_MAP_API_KEY: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error("Invalid environmet variables: ", parsedEnv.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables')
}

export default parsedEnv.data;

