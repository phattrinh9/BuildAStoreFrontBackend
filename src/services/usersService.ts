import { Request, Response } from 'express';
import { UserModel } from '../models/usersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const {
    TOKEN_SECRET
} = process.env 


export const UserService = {
  async signUpUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await UserModel.createUser(username, hashedPassword);


      const accessToken = jwt.sign({ username: username }, process.env.TOKEN_SECRET || '' );
      res.json({ accessToken });
      res.status(201);
    } catch (error) {
      console.error('Error signing up user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
      
    }
  },
  async loginUser(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;

    try {
      const result = await UserModel.getUserWithUserName(username);

      const user = result;
      if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedpassword);
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      const accessToken = jwt.sign({ username: username }, process.env.TOKEN_SECRET || '');
      res.json({ accessToken });
      res.status(201);
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },



  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  // Other CRUD operation methods for user service (update, delete, getById, etc.)
};