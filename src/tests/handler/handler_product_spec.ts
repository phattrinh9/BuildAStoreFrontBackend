import supertest from 'supertest';
import { User } from '../../entities/User'
import app from '../../server';

const request = supertest(app);
let token = '';

describe('Test end points in product_routes', () => {
    beforeAll(async () => {
        const user: User = {
            id: -1,
            first_name: 'product_handler',
            last_name: 'product_handler',
            user_name: 'product_handler',
            hashpassword: 'product_handler'
        }
        const response = await request.post('/api/user/signup').send(user);
        token = `jwt ${response.body}`;
    });

    it('Should return 200 when call api to create product', async () => {
        const response = await request.post('/api/product')
        .send({
            name: "test",
            price:  12
        })
        .set('Authorization', token);
        expect(response.status).toBe(201);
    });

    it('Should return 200 when call api show all products', async () => {
        const response = await request.get('/api/product/getAll').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('Should return 403 when call api show all products with wrong token', async () => {
        const response = await request.get('/api/product/getAll').set('Authorization', 'No Token');
        expect(response.status).toBe(403);
    });

    it('Should return 200 when call api show product by id', async () => {
        const response = await request.get('/api/product/1').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('Should return 401 when call api show product by id with wrong token', async () => {
        const response = await request.get('/api/product/1').set('Authorization', 'No Token');
        expect(response.status).toBe(403);
    });
});
