import request from 'supertest'
import { UserModel } from '../models/usersModel'; // Import your Express app
import { OrderModel } from '../models/ordersModel';
import app from '../server';
import jwt from 'jsonwebtoken';
import { generateTestToken } from "../utils/utils"
import { Order } from '../entities/Order';

export default function runModelTests() {
  describe('User Model Tests', () => {
    it('Model: should get signup user', async () => {
      const user = {
        username: "user_model",
        hashedPassword: "$2b$10$M2T5v2Fv.VXuJkrsZ2kh5O6rquOGYlVHEHie2hIasLcPsbkgq4cR6"
      }
      const res = await UserModel.createUser(user.username, user.hashedPassword);
      expect(res.username).toBe("user_model");
    });

    it('Model: should get login user', async () => {
      const user = {
        "username": "user_model"
      }
      const res = await UserModel.getUserWithUserName(user.username);
      expect(res.username).toBe("user_model");

    });

    it('Model: should get all user', async () => {
      const res = await UserModel.getAllUsers();
      expect(res.length).toBe(1);
    });
  });

  describe('Order Model Tests', () => {

    describe('Model: Create Order', () => {
      it('should create an order', async () => {
        let order: Order;
        const dummyId = -1;
        order = {
          order_id: dummyId,
          customer_id: 1,
          product_id: 1,
          quantity: 1,
          order_date: new Date(),
        };
        const res = await OrderModel.create(order);
        expect(res.order_id).toBeDefined();
      });
    });

    describe('Model: Update Order', () => {
      it('should update an order', async () => {
        let order: Order;
        order = {
          order_id: 2,
          customer_id: 1,
          product_id: 1,
          quantity: 1,
          order_date: new Date(),
        };
        const res = await OrderModel.update(order);
        expect(res.order_id).toBe(2);
      });
    });

    describe('Model: Delete Order', () => {
      it('should delete an order', async () => {
        const res = await OrderModel.delete(2);
        expect(res.order_id).toBe(2);
      });
    });
  
    it('Model: should get all orders', async () => {
      const res = await OrderModel.getAllOrders();
        expect(res.length).toBeGreaterThanOrEqual(3);
    });

    it('Model: should get orders with id', async () => {
      const res = await OrderModel.getOrderById(1);
        expect(res.order_id).toBe(1);
    });
  });
}