import client from "../database";
import { User } from "../entities/User";

export const UserModel = {
    async getAllUsers(): Promise<User[]> {
        const result = await client.query<User>('SELECT * FROM users');
        return result.rows;
    },
  
    async createUser(username: string, hashedPassword: string): Promise<User> {
        const result = await client.query<User>(
          'INSERT INTO users (username, hashedPassword) VALUES ($1, $2) RETURNING *',
          [username, hashedPassword]
        );
        return result.rows[0];
    },

    async getUserWithUserName(username: string): Promise<User> {
      const result = await client.query<User>(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      return result.rows[0];
  },
  
    // Other CRUD operations for the user model (update, delete, getById, etc.)
  };