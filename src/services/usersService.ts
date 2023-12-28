import { Request, Response } from 'express';
import { UserModel } from '../models/usersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { User } from '../entities/User';
import { getTokenByUser } from './auth';

dotenv.config();
const {
  TOKEN_SECRET
} = process.env


export const UserService = {
  async signUpUser(req: Request, res: Response): Promise<void> {
    const { user_name, first_name, last_name, password } = req.body;

    try {
      const user: User = {
        id: -1,
        user_name: user_name || null,
        first_name: first_name || null,
        last_name: last_name || null,
        hashpassword: password || null,
      }
      const newUser = await UserModel.create(user);

      if (newUser) {
        res.json(getTokenByUser(newUser));
        res.status(201);
      }
    } catch (error) {
      res.status(400).json(error);

    }
  },
  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      if (!username || !password) {
        res.status(400);
        res.send(
          'Missing parameters'
        );
        return false;
      }
      const result = await UserModel.authentication(username, password);

      const user = result;
      if (!user) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
      }

      res.json(getTokenByUser(user));
    } catch (error) {
      console.error('Error login:', error);
      res.status(400).json(error);
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

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    if (id) {
      try {
        const users = await UserModel.getUserWithUserId(parseInt(id));
        res.json(users);
      } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  },

  // Other CRUD operation methods for user service (update, delete, getById, etc.)
};