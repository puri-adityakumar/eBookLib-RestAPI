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
4. In `package.json`, add the following code to the `scripts` section to run the server:
    ```json
     "scripts": {
       "dev": "nodemon server.ts"
    }
    ```
Note: You need to create a file `server.ts` and then run cmd `npm run dev`


## Best practices

