# eLibrary REST API

## About

eLibrary is a REST API project built using Node.js, Express.js, TypeScript, and MongoDB. This project provides a backend service for managing an eBook library, including user authentication, book management, and file uploads.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-%3E%3D%204.0.0-blue)
![MongoDB](https://img.shields.io/badge/mongodb-v6-green)

### Tech Stack

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) Node.js
- ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) Express.js
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) TypeScript
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) MongoDB

### Features

- User registration and authentication
- Book management (add, update, delete, list)
- File uploads for book covers and PDFs
- JWT-based authentication

---

# [LIVE LINK ☘️](https://ebooklib-restapi.onrender.com/)

## 📋 Overview

This API provides a robust backend for an electronic library system with the following key features:

- 🔐 **Secure Authentication** using JWT
- 📖 **Book Management** with CRUD operations
- 🖼️ **File Handling** for books and cover images
- ☁️ **Cloud Storage** integration
- 🔄 **Real-time Updates**

## Table of Contents

- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [Users](#users)
    - [Register User](#register-user)
    - [Login User](#login-user)
  - [Books](#books)
    - [Add New Book](#add-new-book)
    - [Update Book](#update-book)
    - [List All Books](#list-all-books)
    - [Get Single Book](#get-single-book)
    - [Delete Book](#delete-book)
- [Error Responses](#error-responses)
- [Build Instructions](#build-a-restapi-using-elibrary-system-using-nodejs-expressjs-typescript--mongodb)
  - [Setup Node Project](#setup-node-project)
  - [Best Practices](#best-practices)
  - [Installation of Express Server](#installation-of-express-server)
  - [Database Connection](#database-connection)
  - [User Management](#user-management)

# API Documentation

## Base URL

```
http://localhost:5513
```

## 🔑 Authentication

All protected endpoints require JWT authentication. The token must be included in the request headers:

```http
Authorization: Bearer <jwt_token>
```

**Security Features:**

- 🔒 bcrypt password hashing
- 🛡️ CORS protection
- ⏱️ Rate limiting
- 📁 Secure file upload validation

## Endpoints

### 👤 Users

#### Register User

```http
POST /api/users/register
```

**Description**: Register a new user.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "User Registered",
  "accessToken": "string"
}
```

#### Login User

```http
POST /api/users/login
```

**Description**: Login an existing user.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "User Logged In",
  "accessToken": "string"
}
```

### 📚 Books

#### Add New Book

```http
POST /api/books/add
```

**Authentication required**

**Description**: Add a new book to the library.

**Request Body (multipart/form-data):**

```json
{
  "title": "string",
  "author": "string",
  "description": "string",
  "genre": "string",
  "coverImage": "file (image)",
  "file": "file (PDF)"
}
```

**Response:**

```json
{
  "id": "string"
}
```

#### Update Book

```http
PATCH /api/books/:bookId
```

**Authentication required**

**Description**: Update an existing book's details.

**URL Parameters:**

- `bookId`: String (MongoDB ObjectId)

**Request Body (multipart/form-data):**

```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "genre": "string (optional)",
  "coverImage": "file (image, optional)",
  "file": "file (PDF, optional)"
}
```

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "author": "string",
  "genre": "string",
  "coverImage": "string (URL)",
  "file": "string (URL)",
  "uploader": "string (User ID)"
}
```

#### List All Books

```http
GET /api/books
```

**Description**: Retrieve a list of all books.

**Query Parameters:**

- `page`: number (default: 1)
- `limit`: number (default: 10)

**Response:**

```json
{
  "totalBooks": "number",
  "totalPages": "number",
  "currentPage": "number",
  "books": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "author": {
        "_id": "string",
        "name": "string"
      },
      "genre": "string",
      "coverImage": "string (URL)",
      "file": "string (URL)",
      "uploader": "string (User ID)"
    }
  ]
}
```

#### Get Single Book

```http
GET /api/books/:bookId
```

**Description**: Retrieve details of a single book.

**URL Parameters:**

- `bookId`: String (MongoDB ObjectId)

**Response:**

```json
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "author": {
    "_id": "string",
    "name": "string"
  },
  "genre": "string",
  "coverImage": "string (URL)",
  "file": "string (URL)",
  "uploader": "string (User ID)"
}
```

#### Delete Book

```http
DELETE /api/books/:bookId
```

**Authentication required**

**Description**: Delete a book from the library.

**URL Parameters:**

- `bookId`: String (MongoDB ObjectId)

**Response:**

```json
{
  "message": "Book deleted successfully"
}
```

## ⚠️ Error Handling

All endpoints follow this consistent error format:

```typescript
{
  message: string;    // 💬 Human-readable error message
  code: string;      // 🏷️ Error code for client handling
  errorStack?: string; // 🔍 Stack trace (development only)
  validation?: {     // ✔️ Validation errors
    field: string;
    message: string;
  }[];
}
```

## 🚦 Rate Limiting

| Endpoint Type     | Rate Limit  |
| ----------------- | ----------- |
| 🔐 Authentication | 5 req/min   |
| 🌐 General        | 100 req/min |
| 📤 File Upload    | 10 req/min  |

---

# Build a RESTAPI using eLibrary system using Nodejs, ExpressJS, Typescript & MongoDB

## Setup Node Project

To set up the Node.js project, follow these steps:

1. Initialize a new Node.js project:

   ```bash
   npm init
   ```

2. Install the necessary dependencies:

   ```bash
   npm install express mongoose
   ```

   2.1. Install the necessary development dependencies:

   ```bash
   npm install -D typescript ts-node @types/node @types/express
   ```

3. Create a `tsconfig.json` file for TypeScript configuration:
   ```bash
   npx tsc --init
   ```
4. In `package.json`, add the following code to the `scripts` section to run the server:
   `json
 "scripts": {
   "dev": "nodemon server.ts"
}
`
   Note: You need to create a file `server.ts` and then run cmd `npm run dev`

## Best Practices

To ensure the quality and maintainability of your code, consider following these best practices:

1. **Using Git**:

   - **Version Control**: Use Git for version control to keep track of changes and collaborate with other developers.
   - **Branching Strategy**: Implement a branching strategy such as Git Flow or feature branching to manage your development workflow.
   - **Commit Messages**: Write clear and concise commit messages to document the history of your project.

2. **Using ESLint**:

   - **Linting**: Use ESLint to analyze your code for potential errors and enforce coding standards.
   - **Configuration**: Create an `.eslint.config.mjs` file to configure ESLint rules according to your project's requirements.
   - **Integration**: Integrate ESLint with your code editor and CI/CD pipeline to ensure consistent code quality.

3. **Using Prettier for Code Formatting**:

   - **Code Formatting**: Use Prettier to automatically format your code and maintain a consistent style across your project.
   - **Configuration**: Create a `.prettierrc` file to configure Prettier options.
   - **Integration**: Integrate Prettier with your code editor and pre-commit hooks to format code before committing.

4. **Using Environment Variables**:

   - **dotenv**: Use the `dotenv` package to manage environment variables.
     ```bash
     npm install dotenv
     ```
   - **Create a `.env` file**: Store your environment variables in a `.env` file at the root of your project. Also a file `.env.sample` to store abstract of enviroment variables.
     ```
     PORT=3000
     ```
   - **Create a `config.ts` file**: location: `/src/config/config.ts` Load environment variables and centralize configuration settings.

     ```typescript
     import { config } from "dotenv";

     config();

     const _credentials = {
       port: process.env.PORT,
     };

     export const credentials = Object.freeze(_credentials);
     ```

   - This file is used to load environment variables from a .env file into process.env.
   - It centralizes the configuration settings for the application, making it easier to manage and access them.
   - By freezing the credentials object, we ensure that the configuration settings cannot be modified elsewhere in the application.

   - **Security Flow**:
     - **.env**: Stores the actual values of environment variables.
     - **.env.sample**: Provides a template for required environment variables.
     - **.gitignore**: Ensures `.env` isn't committed to version control.
     - **credentials**: Provides type-safe access to these values.

By following these best practices, you can improve the readability, maintainability, and overall quality of your codebase.

## Installation of Express Server

1. Install Express:

   ```bash
   npm install express
   ```

2. Install type definitions for Express:

   ```bash
   npm install -D @types/express
   ```

   This provides TypeScript definitions and IntelliSense for Express, improving the developer experience.

3. Write a boilerplate code in a new file (e.g., `app.ts`):

   ```typescript
   import express from "express";

   const app = express();

   app.use(express.json());

   app.get("/", (req, res) => {
     res.send("Hello World!");
   });

   export default app;
   ```

4. Separate the server logic into a different file (e.g., `server.ts`):

   ```typescript
   import app from "./app";

   const PORT = process.env.PORT || 3000;

   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

   This separation helps with testing the app without running the server. By importing the app instance, you can test it independently.

5. Run the server:
   ```bash
   npm run dev
   ```

## Database Connection

1. Ensure you have a `.env` file with your MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://...
   ```
2. Install the Mongoose type definitions:
   ```bash
   npm install mongoose
   npm install -D @types/mongoose
   ```
3. Update the `config.ts` file to reference `databaseUrl`:
   ```typescript
   // filepath: /src/config/config.ts
   // ...existing code...
   const _credentials = {
     port: process.env.PORT,
     databaseUrl: process.env.MONGODB_URI,
   };
   // ...existing code...
   ```
4. Use `credentials.databaseUrl` wherever you need the connection string in your code, typically in a try/catch block for robust error handling:
   ```typescript
   // Example of try/catch error handling:
   try {
     // ...database connection logic...
   } catch (error) {
     console.error("Database connection error:", error);
   }
   ```

## User Management

To create user-related components, follow these steps:

1. **Create User Model**:

   - Define the user schema and model in a new file (e.g., `userModel.ts`).

   ```typescript
   import mongoose, { Schema, Document } from "mongoose";

   export interface IUser extends Document {
     name: string;
     email: string;
     password: string;
   }

   const UserSchema: Schema = new Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
   });

   export default mongoose.model<IUser>("User", UserSchema);
   ```

2. **Create User Controller**:

   - Implement user-related logic in a new file (e.g., `userController.ts`).

   ```typescript
   import { Request, Response } from "express";
   import User from "./userModel";

   export const createUser = async (req: Request, res: Response) => {
     try {
       const user = new User(req.body);
       await user.save();
       res.status(201).json(user);
     } catch (error) {
       res.status(400).json({ message: error.message });
     }
   };
   ```

3. **Create User Routes**:

   - Define user-related routes in a new file (e.g., `userRouter.ts`).

   ```typescript
   import { Router } from "express";
   import { createUser } from "./userController";

   const router = Router();

   router.post("/", createUser);

   export default router;
   ```

4. **Middleware**:

   - Implement middleware for authentication, validation, etc.

   ```typescript
   import { Request, Response, NextFunction } from "express";

   export const authMiddleware = (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     // Authentication logic here
     next();
   };
   ```

5. **Multer for File Uploads**:

   - Set up Multer for handling file uploads.

   ```typescript
   import multer from "multer";

   const storage = multer.diskStorage({
     destination: (req, file, cb) => {
       cb(null, "uploads/");
     },
     filename: (req, file, cb) => {
       cb(null, `${Date.now()}-${file.originalname}`);
     },
   });

   export const upload = multer({ storage });
   ```

6. **Cloudinary for Image Storage**:

   - Configure Cloudinary for storing images.

   ```typescript
   import { v2 as cloudinary } from "cloudinary";

   cloudinary.config({
     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
   });

   export const uploadToCloudinary = async (filePath: string) => {
     return await cloudinary.uploader.upload(filePath);
   };
   ```

## Best Practices

1. **Error Handling**:

   - Use try/catch blocks for robust error handling.
   - Implement a global error handler.

2. **Environment Variables**:

   - Store sensitive information in environment variables.
   - Use a `.env` file and keep it out of version control.

3. **Code Quality**:
   - Use ESLint and Prettier for consistent code quality and formatting.
   - Write clear and concise commit messages.

By following these steps and best practices, you can create a robust and maintainable user management system in your project.

## 📜 License

MIT © [Aditya Kumar Puri](https://github.com/puri-adityakumar)

---

<div align="center">
Made with ❤️ by <a src = "https://github.com/puri-adityakumar/eBookLib-RestAPI">Aditya. </a>
</div>
