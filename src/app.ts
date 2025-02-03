// We're just going to import express and create an instance of it. We'll export it so we can use it in our server.ts file.
// It's useful step when making unit tests, because we can import the app instance and test it without running the server.

import express from 'express';
import userRouter from './users/userRouter';
import bookRouter from './books/bookRouter';
import cors from 'cors';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import globalErrorHandler from './middleware/globalErrorHandler';
import { credentials } from './config/config';

const app = express();
app.use(cors({
    origin: credentials.clientUrl || 'http://localhost:3000',
}));
app.use(express.json());

// Serve API documentation at root route
app.get('/', async (req, res) => {
    try {
        const docsPath = path.join(__dirname, 'Docs.md');
        const templatePath = path.join(__dirname, 'templates/docs.html');
        
        const markdown = fs.readFileSync(docsPath, 'utf-8');
        const template = fs.readFileSync(templatePath, 'utf-8');
        
        const renderedMarkdown = await marked(markdown);
        const html = template.replace('{{content}}', renderedMarkdown);
        
        res.send(html);
    } catch (error) {
        res.status(500).send('Error generating documentation');
    }
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(globalErrorHandler);

export default app;