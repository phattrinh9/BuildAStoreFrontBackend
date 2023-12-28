import supertest from 'supertest';
import { User } from '../../entities/User'
import app from '../../server';
import { UserModel } from '../../models/usersModel';
import { verifyAuthToken } from '../../services/auth';
import jwt, { Secret } from 'jsonwebtoken';
import client from '../../database';
import bcrypt from 'bcrypt';

const request = supertest(app);
let token = '';

describe('Test end points in user_routes', () => {
    it('Should return 200 when call api create user', async () => {
        const user: User = {
            id: -1,
            user_name: 'testOrder',
            first_name: 'first_name_test_handler',
            last_name: 'last_name_test_handler',
            hashpassword: 'testOrder'
        }
        const response = await request.post('/api/user/signup').send(user);
        token = `jwt ${response.body}`;

        expect(response.status).toBe(200);
    });

    it('Should return 200 when call api show all users', async () => {

        const response = await request.get('/api/user/getAll').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('Should return 403 when call api show all users with wrong token', async () => {
        const response = await request.get('/api/user/getAll').set('Authorization', 'No Token');
        expect(response.status).toBe(403);
    });

    it('Should return 200 when call api show user by id', async () => {
        const response = await request.get('/api/user/1').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('Should return 403 when call api show user by id with empty', async () => {
        const response = await request.get('/api/user/1').set('Authorization', 'No Token');
        expect(response.status).toBe(403);
    });


    it('Should return 401 when call api authentication user', async () => {

        const response = await request.post('/api/user/getToken').send({
            username: 'testOrder',
            password: 'testOrder111111'
        });
        expect(response.status).toBe(401);
    });
});
