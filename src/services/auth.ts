import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/usersModel';
import bcrypt from 'bcrypt';
import { User } from "../entities/User";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const {
    TOKEN_SECRET
} = process.env
const verifyAuthToken = (req: Request, res: Response, NextFunction: () => void) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1];
            const secretKey = process.env.TOKEN_SECRET
            if (secretKey) {
                // const decoded = jwt.verify(token, secretKey);
                try {
                    jwt.verify(token, secretKey, (err: any, user: any) => {
                        if (err) {
                            return res.status(403).json({ message: 'Access denied. Invalid token.' });
                        }
                        NextFunction();
                    });
                } catch (error) {
                    res.send(error);
                }

            } else {
                res.status(401)
            }
        }
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;