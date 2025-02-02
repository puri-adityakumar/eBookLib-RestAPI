
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import userModel from './userModel';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { credentials } from '../config/config';


const createUser = async (req: Request, res: Response, next: NextFunction) => {

     const { name, email, password } = req.body;
     // validation
     if (!name || !email || !password) {
          const error = createHttpError(400, 'All fields are required');
          return next(error);
     }

     // database call
     const user = await  userModel.findOne({email});
     if (user) {
          const error = createHttpError(400, 'User already exists');
          return next(error);
     }

     // hashing password
     const hashedPassword = await bcrypt.hash(password, 10);

     const newUser = await userModel.create({
          name,
          email,
          password: hashedPassword
     });

     // Token generation JWT

     const token = sign({ sub: newUser._id}, credentials.jwtSecret as string, { expiresIn: '7d', algorithm: "RS256" });
     


     res.json({ id: newUser._id, name: newUser.name, email: newUser.email }); 




};

export { createUser };