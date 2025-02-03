import mongoose from "mongoose";
import { Book } from "./bookTypes";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    file: { 
        type: String,
        required: false
    }
});

export default mongoose.model<Book>("Book", bookSchema);