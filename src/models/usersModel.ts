import client from "../database";
import { User, UserAuth } from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
export const UserModel = {
  async getAllUsers(): Promise<User[]> {
    const result = await client.query<User>('SELECT * FROM "User"');
    return result.rows;
  },

  async create(user: User): Promise<User> {
    const saltRounds = parseInt(process.env.SALT_ROUNDS as string, 10);
    // const salt = await bcrypt.genSalt(parseInt(saltRounds as string, 10));
    user.hashpassword = bcrypt.hashSync(user.hashpassword + process.env.BCRYPT_PW, saltRounds);

    const result = await client.query<User>(
      'INSERT INTO "User" (user_name, first_name, last_name, hashpassword) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.user_name, user.first_name, user.last_name, user.hashpassword]
    );
    return result.rows[0];
  },

  async getUserWithUserId(id: number): Promise<User> {
    const result = await client.query<User>(
      'SELECT * FROM "User" WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  async authentication(userName: string, password: string): Promise<User | null> {
    try {
      const result = await client.query<User>(
        'SELECT hashpassword FROM "User" WHERE user_name=($1)',
        [userName]
      );
      if (result.rowCount > 0) {
        const user = result.rows[0];
        if (bcrypt.compareSync(password + process.env.BCRYPT_PW, user.hashpassword)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  },

  // Other CRUD operations for the user model (update, delete, getById, etc.)
};