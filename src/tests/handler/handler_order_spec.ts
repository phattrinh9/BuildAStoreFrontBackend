import supertest from 'supertest';
import { User } from '../../entities/User'
import app from '../../server';

const request = supertest(app);
let token = '';

describe('Test end points in order_routes', () => {
    beforeAll(async () => {
        const user: User = {
            id: -1,
            first_name: 'order_handler',
            last_name: 'order_handler',
            user_name: 'order_handler',
            hashpassword: 'order_handler'
        }
        const response = await request.post('/api/user/signup').send(user);
        token = `jwt ${response.body}`;
    });

    it('Should return 200 when call api to create order', async () => {
        const response = await request.post('/api/order')
        .send({
            user_id: 2,
            status_of_order: 'active',
            orderDetails: [
                {
                    product_id: 1,
                    quantity: 5
                },
                {
                    product_id: 2,
                    quantity: 5
                }
            ]
        })
        .set('Authorization', token);
        expect(response.status).toBe(201);
    });

    it('Should return 200 when call api show all orders', async () => {
        const response = await request.get('/api/order/current/1').set('Authorization', token);
        expect(response.status).toBe(200);
    });

    it('Should return 403 when call api show all orders with wrong token', async () => {
        const response = await request.get('/api/order/current/1').set('Authorization', 'No Token');
        expect(response.status).toBe(403);
    });

});
