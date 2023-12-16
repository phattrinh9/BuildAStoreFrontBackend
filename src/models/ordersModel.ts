
import client from "../database";
import { Order } from "../entities/Order";

export const OrderModel = {
  async create(order: Order): Promise<Order> {
    const result = await client.query<Order>(
      'INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [order.customer_id, order.product_id, order.quantity, order.order_date]
    );
    return result.rows[0];
  },

  async update(order: Order): Promise<Order> {
    const result = await client.query<Order>(
      'UPDATE orders SET ' +
      'customer_id = $1, ' +
      'product_id = $2, ' +
      'quantity = $3 ' +
      //  "order_date = $4 " +
      'WHERE order_id = $4  RETURNING *',
      [order.customer_id, order.product_id, order.quantity, order.order_id]
    );
    return result.rows[0];
  },

  async delete(order_id: number): Promise<Order> {
    const result = await client.query<Order>(
      'DELETE FROM orders WHERE order_id = $1 RETURNING *',
      [order_id]
    );
    return result.rows[0];
  },

  async getAllOrders(): Promise<Order[]> {
    const result = await client.query<Order>('SELECT * FROM orders');
    return result.rows;
  },

  async getOrderById(order_id: number): Promise<Order> {
    const result = await client.query<Order>(
      'SELECT * FROM orders WHERE order_id = $1',
      [order_id]
    );
    return result.rows[0];
  },

  // Other CRUD operations for the Order model (update, delete, getById, etc.)
};
