import express, { Request, Response } from 'express';
import { ProductService } from '../services/productsService';
import { verifyAuthToken } from "../services/auth";

const productRouter = express.Router();

// GET /orders - Fetch all orders
productRouter.get('/getAll', ProductService.getAll);

// GET /orderByid - get order by id
productRouter.get('/:id', ProductService.getById);

// POST /create - create order
productRouter.post('/',verifyAuthToken, ProductService.create);

// // PUT /update - update order
// productRouter.put('/:id',verifyAuthToken, ProductService.update);

// // DELETE /delete - delete order
// productRouter.delete('/:id',verifyAuthToken, ProductService.delete);
export default productRouter;