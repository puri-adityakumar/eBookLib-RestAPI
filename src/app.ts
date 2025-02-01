// We're just going to import express and create an instance of it. We'll export it so we can use it in our server.ts file.
// It's useful step when making unit tests, because we can import the app instance and test it without running the server.



import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});
export default app; 