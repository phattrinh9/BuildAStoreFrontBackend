import { Request, Response } from 'express';
import { OrderModel } from '../models/ordersModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { Order, OrderDetail } from "../entities/Order";

dotenv.config();
const {
    TOKEN_SECRET
} = process.env


export const OrderService = {
    async create(req: Request, res: Response): Promise<void> {
        // code not work
        // const { user_id, status_of_order, order_details } = req.body;
        const order_details = req.body.order_details as unknown as OrderDetail[];
        const status_of_order = req.body.status_of_order as unknown as string;
        const user_id = req.body.user_id as unknown as number;
        let order: Order;
        const dummyId = -1;
        order = {
            id: dummyId,
            user_id: user_id,
            status_of_order: status_of_order,
            orderDetails: order_details
        };

        const result = await OrderModel.create(order);

        if (!result) {
            res.status(401).json({ message: 'Can not create Order' });
            return;
        }  else {
            res.status(201).json({ message: 'Created Order ',result});
        }
    },
    // async update(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     if (id) {
    //         const order_id: number = parseInt(id);
    //         const { customer_id, product_id, quantity, order_date } = req.body;
    //         let order: Order;
    //         order = {
    //             order_id: order_id,
    //             customer_id: customer_id || null,
    //             product_id: product_id || null,
    //             quantity: quantity || null,
    //             order_date: order_date || null,
    //         };


    //         const result = await OrderModel.update(order);

    //         if (!result) {
    //             res.status(401).json({ message: 'Can not update Order' });
    //             return;
    //         } else {
    //             res.status(201).json({ message: 'Updated Order ',order_id});
    //         }
    //     } else {
    //         res.status(401).json({ message: 'Can not read Order Id' });
    //         return;
    //     }


    // },
    // async delete(req: Request, res: Response): Promise<void> {
    //     const { id } = req.params;
    //     if (id) {
    //         const order_id: number = parseInt(id);
    //         const result = await OrderModel.delete(order_id);
    //         if (!result) {
    //             res.status(401).json({ message: 'Can not update Order' });
    //             return;
    //         }  else {
    //             res.status(200).json({ message: 'Delete Order ',order_id});
    //         }
    //     } else {
    //         res.status(401).json({ message: 'Can not read Order Id' });
    //         return;
    //     }

    // },
    // async getAll(req: Request, res: Response): Promise<void> {
    //     try {
    //         const users = await OrderModel.getAllOrders();
    //         res.json(users);
    //     } catch (error) {
    //         console.error('Error getting orders:', error);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }
    // },
    async getByUserId(req: Request, res: Response): Promise<void> {
        const { user_id } = req.params;
        if (user_id) {
            const userId: number = parseInt(user_id);
            try {
                const orders = await OrderModel.getOrderByUserId(userId);
                res.json(orders);
            } catch (error) {
                console.error('Error getting order with user id ', userId, ':', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }

}