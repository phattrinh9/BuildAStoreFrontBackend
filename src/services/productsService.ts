import { Request, Response } from 'express';
import { ProductModel } from '../models/productsModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Product } from "../entities/Product";

dotenv.config();
const {
    TOKEN_SECRET
} = process.env


export const ProductService = {
    async create(req: Request, res: Response): Promise<void> {
        const { name, price } = req.body;
        let product: Product;
        const dummyId = -1;
        product = {
            id: dummyId,
            name: name || null,
            price: price || null,
        };

        const result = await ProductModel.create(product);

        if (!result) {
            res.status(401).json({ message: 'Can not create Product' });
            return;
        } else {
            res.status(201).json({ message: 'Created Product ', result });
        }
    },

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const order = await ProductModel.getAllProducts();
            res.json(order);
        } catch (error) {
            console.error('Error getting all product', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    },

    async getById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (id) {
            const product_id: number = parseInt(id);
            try {
                const order = await ProductModel.getProductById(product_id);
                res.json(order);
            } catch (error) {
                console.error('Error getting product with id ', product_id, ':', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

}