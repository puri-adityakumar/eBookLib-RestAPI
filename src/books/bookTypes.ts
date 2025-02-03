import { User } from "../users/userTypes";

export interface Book {
    _id: string;
    title: string;
    description: string;
    author: string;
    uploader:User;
    genre: string;
    author: string;
    file: string;
    createdAt: Date;
    updatedAt: Date;
};