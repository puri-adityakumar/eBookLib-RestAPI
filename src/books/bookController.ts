import { Request, Response, NextFunction } from 'express';

const addBook = async( req: Request, res: Response, next: NextFunction ) => {
    res.send('Add book');
}


export { addBook };