
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();
const {
    TOKEN_SECRET
} = process.env


export function generateTestToken(username: string): string {
    // Replace with your token generation logic for testing
    const payload = { username: username }; // Replace '1' with a valid user ID for testing
    const secretKey = process.env.TOKEN_SECRET;
    if (secretKey) {
        const options = {
            expiresIn: '1h', // Set the token expiration time as needed
          };
        const token = jwt.sign(payload, secretKey, options);
        return token;
    }
    return '';
}
