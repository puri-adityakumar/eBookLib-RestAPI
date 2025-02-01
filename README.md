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
       console.error('Database connection error:', error);
   }
   ```
## Global Error-Handling
- Todo Later! Need to fix err

