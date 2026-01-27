
/**
 * Application configuration factory function.
 *
 * Loads and returns application configuration from environment variables.
 *
 * @returns An object containing the application configuration with the following properties:
 * - `environment`: The current environment (defaults to 'development' if NODE_ENV is not set)
 * - `database`: Database connection configuration
 *   - `host`: Database host from DATABASE_HOST environment variable
 *   - `port`: Database port from DATABASE_PORT environment variable (defaults to 5432)
 *
 * @example
 * ```typescript
 * import databaseConfig from './config/database.config';
 * const databaseConfig = databaseConfig();
 * console.log(databaseConfig.port);
 * ```
 */

import { registerAs } from "@nestjs/config";
import Joi from "joi";

// Define the schema for validation using Joi
const schema = Joi.object({
    host: Joi.string().required(),
    port: Joi.number().default(3306).required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
});


// Configuration factory function
export default registerAs('database', () => {
    const config = {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    };

    const { error, value } = schema.validate(config, {
        abortEarly: false, // collect all errors
    });

    if (error) {
        throw new Error(
            `Database config validation error:\n${error.message}`,
        );
    }

    return value;
});
