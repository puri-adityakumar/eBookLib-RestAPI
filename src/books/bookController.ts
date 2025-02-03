import { Request, Response, NextFunction } from 'express';
import cloudinary from '../config/cloudinary';
import path from 'path';
import createHttpError from 'http-errors';
import bookModel from './bookModel';
import fs from 'node:fs'
import { AuthRequest } from '../middleware/authenticate';

const addBook = async( req: Request, res: Response, next: NextFunction ) => {
    const { title, author, description, genre } = req.body;

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const coverImageMimeType = files.coverImage[0].mimetype.split('/').at(-1);

    const fileName = files.coverImage[0].filename;
    const filePath = path.resolve(__dirname, `../../public/data/uploads`, fileName);

    try {
        
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'book-covers',
            format: coverImageMimeType
        })
    
        const bookFileName = files.file[0].filename;
        const bookFilePath = path.resolve(__dirname, `../../public/data/uploads`, bookFileName);
    
        const bookFileUploadResult = await cloudinary.uploader.upload(
            bookFilePath,
            {
                resource_type: "raw",
                filename_override: bookFileName,
                folder: "book-pdfs",
                format: "pdf",
            }
        );

        const _req = req as AuthRequest;
        const newBook = await bookModel.create({
            title,
            author,
            description,
            genre,
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,
            uploader: _req.userId,
        });

        // delete the files from the server
        await fs.promises.unlink(filePath);
        await fs.promises.unlink(bookFilePath);
    
        res.status(201).json({ id: newBook._id });
    } catch (error) {
        console.log(error);
        return next(createHttpError(500, "Error while uploading the files."));
    }
    
}

const updateBook = async( req: Request, res: Response, next: NextFunction ) => {
    const { title, description, genre } = req.body;
    const bookId = req.params.bookId; // `req.params` is used to get the parameters from the url.

    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
        return next(createHttpError(404, "Book not found"));    
    }
    // Check access
    const _req = req as AuthRequest;
    if (book.uploader.toString() !== _req.userId) {
        return next(createHttpError(403, "You can not update others book."));
    }

    // check if image field is exists.

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let completeCoverImage = "";
    if (files.coverImage) {
        const filename = files.coverImage[0].filename;
        const converMimeType = files.coverImage[0].mimetype.split("/").at(-1);
        // send files to cloudinary
        const filePath = path.resolve(
            __dirname,
            "../../public/data/uploads/" + filename
        );
        completeCoverImage = filename;
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: completeCoverImage,
            folder: "book-covers",
            format: converMimeType,
        });

        completeCoverImage = uploadResult.secure_url;
        await fs.promises.unlink(filePath);
    }

    // check if file field is exists.
    let completeFileName = "";
    if (files.file) {
        const bookFilePath = path.resolve(
            __dirname,
            "../../public/data/uploads/" + files.file[0].filename
        );

        const bookFileName = files.file[0].filename;
        completeFileName = bookFileName;

        const uploadResultPdf = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: "raw",
            filename_override: completeFileName,
            folder: "book-pdfs",
            format: "pdf",
        });

        completeFileName = uploadResultPdf.secure_url;
        await fs.promises.unlink(bookFilePath);
    }

    const updatedBook = await bookModel.findOneAndUpdate(
        {
            _id: bookId,
        },
        {
            title: title,
            description: description,
            genre: genre,
            coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
            file: completeFileName ? completeFileName : book.file,
        },
        { new: true }
    );

    res.json(updatedBook);

};

const listBooks = async (req: Request, res: Response, next: NextFunction) => {
    // const sleep = await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
        
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const books = await bookModel.find().populate("author", "name").skip(skip).limit(limit);
        const totalBooks = await bookModel.countDocuments();

        res.json({
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            books
        });
    } catch (err) {
        return next(createHttpError(500, "Error while getting a book"));
    }
};

const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    try {
        const book = await bookModel.findOne({ _id: bookId }).populate("author", "name");

        if (!book) {
            return next(createHttpError(404, "Book not found"));
        }

        res.json(book);
    } catch (err) {
        return next(createHttpError(500, "Error while getting a book"));
    }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    const book = await bookModel.findOne({ _id: bookId });

    if (!book) {
        return next(createHttpError(404, "Book not found"));
    }

    // Check access
    const _req = req as AuthRequest;
    if (book.uploader.toString() !== _req.userId) {
        return next(createHttpError(403, "You can not delete others book."));
    }

    const coverFileSplits = book.coverImage.split("/");
    const coverImagePublicId =
        coverFileSplits.at(-2) +
        "/" +
        coverFileSplits.at(-1)?.split(".").at(-2);

    const bookFileSplits = book.file.split("/");
    const bookFilePublicId =
        bookFileSplits.at(-2) + "/" + bookFileSplits.at(-1);
    console.log("bookFilePublicId", bookFilePublicId);

    try {
        await cloudinary.uploader.destroy(coverImagePublicId);
        await cloudinary.uploader.destroy(bookFilePublicId, {
            resource_type: "raw",
        });
    } catch (err) {
        return next(createHttpError(500, "Error while deleting the files from cloudinary."));
    }

    await bookModel.deleteOne({ _id: bookId });

    return res.sendStatus(204);


};


export { addBook, updateBook, listBooks, getSingleBook, deleteBook }; 