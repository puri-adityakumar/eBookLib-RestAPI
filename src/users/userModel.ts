import mongoose from "mongoose";
import { User } from "./userTypes";

const userSchema = new mongoose.Schema<User>({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<User>("User", userSchema);




// What is generic in TypeScript "<User>" ? 
// A generic type is a type that is defined with a type parameter.
// In this case, the User type is a generic type that takes a User type as a parameter.
// The User type is defined in the userTypes.ts file.