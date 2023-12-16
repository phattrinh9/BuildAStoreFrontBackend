import express, { Request, Response } from 'express';
import { OrderService } from '../services/ordersService';
import verifyAuthToken from "../services/auth";

const orderRouter = express.Router();

// GET /orders - Fetch all orders
orderRouter.get('/getAll', verifyAuthToken, OrderService.getAll);

// GET /orderByid - get order by id
orderRouter.get('/:id', verifyAuthToken, OrderService.getById);

// POST /create - create order
orderRouter.post('/',verifyAuthToken, OrderService.create);

// PUT /update - update order
orderRouter.put('/:id',verifyAuthToken, OrderService.update);

// DELETE /delete - delete order
orderRouter.delete('/:id',verifyAuthToken, OrderService.delete);
export default orderRouter;