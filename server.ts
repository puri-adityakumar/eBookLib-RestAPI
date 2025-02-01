import app from "./src/app";
import { credentials } from "./src/config/config";
import connectDb from "./src/config/db";

const startServer = async () => {

    await connectDb(); // We added a call to the connectDb function to connect to the database before starting the server.
    const port = credentials.port || 3000;



    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}

startServer();