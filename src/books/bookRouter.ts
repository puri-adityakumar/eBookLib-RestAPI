import express from 'express';
import path from 'path';
import { addBook } from './bookController';
import multer from 'multer';

const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 3e7 },
})

// routes
bookRouter.post("/add", upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), addBook);



export default bookRouter;
