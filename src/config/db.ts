import mongoose from 'mongoose';
import { credentials } from './config';

const connectDb = async () => {

    try {

        mongoose.connection.on('connected', () => {
            console.log('Connected to the database');
        });

        mongoose.connection.on('error', (error) => {
            console.error('Error connecting to the database: ', error);
        }); // We added an error event listener to log any errors that occur when connecting to the database.

        await mongoose.connect(credentials.databaseUrl as string); // We were receving an error here because the databaseUrl was not being read as a string. We fixed this by adding the 'as string' type assertion (this is callsed type casting in TypeScript).


    } catch (error) {
        console.error('Error connecting to the database: ', error);

        process.exit(1); // We added a call to process.exit(1) to terminate the application if an error occurs when connecting to the database.
    }

}

export default connectDb;