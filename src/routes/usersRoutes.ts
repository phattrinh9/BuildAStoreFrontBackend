import express, { Request, Response } from 'express';
import { UserService } from '../services/usersService';
import { verifyAuthToken } from "../services/auth";

const userRouter = express.Router();

// GET /users - Fetch all users
userRouter.get('/getAll', verifyAuthToken, UserService.getAllUsers);

// GET /users/:id - get users id
userRouter.get('/:id', verifyAuthToken, UserService.getUserById);

// POST /signup - Sign up a new user
userRouter.post('/signup', UserService.signUpUser);

// POST /login - Sign in a user
userRouter.post('/getToken', UserService.loginUser);

export default userRouter;