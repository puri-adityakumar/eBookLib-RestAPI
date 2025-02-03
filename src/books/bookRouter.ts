import express from 'express';
import path from 'path';
import { addBook, deleteBook, getSingleBook, listBooks, updateBook } from './bookController';
import multer from 'multer';
import authenticate from '../middleware/authenticate';

const bookRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 3e7 },
})

// routes
bookRouter.post("/add", authenticate, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), addBook);

bookRouter.patch("/:bookId", authenticate, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), updateBook);

bookRouter.get("/", listBooks);
bookRouter.get("/:bookId", getSingleBook);

bookRouter.delete("/:bookId", authenticate, deleteBook);


export default bookRouter;
