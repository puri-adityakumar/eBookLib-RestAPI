export interface User {
    _id: string; // this is the id of the user in the database in mongoDb
    name: string;
    email: string;
    password: string;
}