// We're just going to import express and create an instance of it. We'll export it so we can use it in our server.ts file.
// It's useful step when making unit tests, because we can import the app instance and test it without running the server.



import express from 'express';
import userRouter from './users/userRouter';
import bookRouter from './books/bookRouter';
import cors from 'cors';

import globalErrorHandler from './middleware/globalErrorHandler';
import { credentials } from './config/config';


const app = express();
app.use(cors(
    {
        origin: credentials.clientUrl || 'http://localhost:3000',
    }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);





// global error handler : Todo - implement this
app.use(globalErrorHandler);






export default app;