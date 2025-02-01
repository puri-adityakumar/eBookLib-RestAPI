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

By following these best practices, you can improve the readability, maintainability, and overall quality of your codebase.

## Installion of Express Server

- install express
- install `npm install -D @types/express` and write why it's needed
-