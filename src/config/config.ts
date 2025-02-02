// This file is used to load environment variables from a .env file into process.env.
// It centralizes the configuration settings for the application, making it easier to manage and access them.

import { config } from 'dotenv';

config();

const _credentials = {
    port: process.env.PORT,
    databaseUrl: process.env.MONGODB_URI,
    env: process.env.NODE_ENV || 'development', // this line sets the default value of the env variable to 'development' if it is not set in the .env file.
    jwtSecret: process.env.JWT_SECRET,

};

export const credentials = Object.freeze(_credentials);

// By freezing the credentials object, we ensure that the configuration settings cannot be modified elsewhere in the application.
