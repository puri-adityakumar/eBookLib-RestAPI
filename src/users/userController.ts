
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import userModel from './userModel';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { credentials } from '../config/config';
import { User } from './userTypes';


const createUser = async (req: Request, res: Response, next: NextFunction) => {

     const { name, email, password } = req.body;
     // validation

     if (!name || !email || !password) {
          const error = createHttpError(400, 'All fields are required');
          return next(error);
     }


     // database call

     try {
          const user = await  userModel.findOne({email});
          if (user) {
               const error = createHttpError(400, 'User already exists');
               return next(error);
          }
     } catch (error) {
          return next(createHttpError(500, 'Error while checking user'));
     }
    

     // hashing password
     const hashedPassword = await bcrypt.hash(password, 10);
     let newUser: User;
     try {
               newUser = await userModel.create({
               name,
               email,
               password: hashedPassword
          }); 

          // res.json({ id: newUser._id, name: newUser.name, email: newUser.email }); 

     } catch (error) {
          return next(createHttpError(500, 'Error while creating user'));
     }

     
     // Token generation JWT

     try {
          const token = sign({ sub: newUser._id}, credentials.jwtSecret as string, { expiresIn: '7d', algorithm: "HS256" });
          res.status(201).json({ accessToken: token });
     } catch (error) {
          return next(createHttpError(500, 'Error while generating token'));
     }
     


};


// todo: login user
const loginUser = async (req: Request, res: Response, next: NextFunction) => {

     const { email, password } = req.body;

     // validation

     if (!email || !password) {
          const error = createHttpError(400, 'All fields are required');
          return next(error);
     }

     try {
          const user = await userModel.findOne({ email }); 

     if (!user) {
          const error = createHttpError(404, 'User not found');
          return next(error);
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) {
          const error = createHttpError(401, 'Invalid credentials');
          return next(error);
     }



     } catch (error) {
          return next(createHttpError(500, 'Error while checking user'));  
     }
     
  

     

     res.json({ message: 'Login route working fine' });
};
export { createUser, loginUser };