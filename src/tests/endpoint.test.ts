// import request from 'supertest'
// import orderRouter from '../routes/ordersRoutes'; // Import your Express app
// import userRoutes from '../routes/usersRoutes';
// import app from '../server';
// import jwt from 'jsonwebtoken';
// import { generateTestToken } from "../utils/utils"

// export default function runEndpointTests() {
//   describe('User API Endpoints', () => {
//     it('should get signup user', async () => {
//       const userData = {
//         "username": "user",
//         "password": "user2412",
//       }
//       const res = await request(app)
//         .post('/api/user/signup')
//         .send(userData)
//       expect(res.status).toBe(200);
//       // Add more expectations if needed based on the response data or structure
//     });

//     it('should get login user', async () => {
//       const userData = {
//         "username": "user",
//         "password": "user2412",
//       }
//       const res = await request(app)
//         .post('/api/user/login')
//         .send(userData)
//       expect(res.status).toBe(200);

//       // Add more expectations if needed based on the response data or structure
//     });

//     let testToken: string; // Store the generated test token for authentication
//     testToken = generateTestToken("user");
//     it('should get all user', async () => {
//       const res = await request(app)
//         .get('/api/user/users')
//         .set('Authorization', `Bearer ${testToken}`); // Include the test token in the authorization header
//       expect(res.status).toBe(200);
//       // Add more expectations if needed based on the response data or structure
//     });
//   });

//   describe('Order API Endpoints', () => {
//     let testToken: string; // Store the generated test token for authentication

//     beforeAll(async () => {
//       testToken = generateTestToken("user");
//     });

//     it('should get all orders with authentication', async () => {
//       const res = await request(app)
//         .get('/api/order/getAll')
//         .set('Authorization', `Bearer ${testToken}`); // Include the test token in the authorization header
//       expect(res.status).toBe(200);
//       // Add more expectations if needed based on the response data or structure
//     });

//     it('should throw error while verify token', async () => {
//       const res = await request(app)
//         .get('/api/order/getAll')
//         .set('Authorization', `Bearer `); // Include the test token in the authorization header
//       expect(res.status).toBe(403);
//       // Add more expectations if needed based on the response data or structure
//     });

//     it('should create an order', async () => {
//       const orderData = {
//         // Replace with the data needed to create an order
//         "customer_id": 2,
//         "product_id": 3,
//         "quantity": 1,
//         "order_date": "2022-10-31T17:00:00.000Z"
//       };

//       const res = await request(app)
//         .post('/api/order')
//         .set('Authorization', `Bearer ${testToken}`)
//         .send(orderData);
//       expect(res.status).toBe(201);
//     });

//     it('should update an order', async () => {
//       const orderData = {
//         // Replace with the data needed to create an order
//         "customer_id": 2,
//         "product_id": 3,
//         "quantity": 1,
//         "order_date": "2022-10-31T17:00:00.000Z"
//       };

//       const res = await request(app)
//         .put('/api/order/3')
//         .set('Authorization', `Bearer ${testToken}`)
//         .send(orderData);
//       expect(res.status).toBe(201);
//     });

//     it('should delete an order', async () => {
//       const res = await request(app)
//         .delete('/api/order/3')
//         .set('Authorization', `Bearer ${testToken}`);
//       expect(res.status).toBe(200);
//     });

//     // Add more test cases as needed
//   });
// }