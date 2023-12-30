
import client from "../database";
import { Order, OrderDetail } from "../entities/Order";

export const OrderModel = {
  async create(order: Order): Promise<Order> {

    try {
      const resultOrder = await client.query<Order>(
        'INSERT INTO "Order" (user_id, status_of_order) VALUES ($1, $2) RETURNING *',
        [order.user_id, order.status_of_order]
      );

      let orderDetails: OrderDetail[] = [];
      if (order.orderDetails && order.orderDetails.length > 0) {
        for (const orderDetail of order.orderDetails) {
          const resultOrderDetails = await client.query<OrderDetail>(
            'INSERT INTO "OrderDetail" (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [resultOrder.rows[0].id, orderDetail.product_id, orderDetail.quantity]
          )
          orderDetails.push(...resultOrderDetails.rows);
        }
      }
      return {
        ...resultOrder.rows[0],
        orderDetails: orderDetails,
      };
    } catch (error) {
      throw new Error(`${error}`);
    }

  },


  async getOrderByUserId(user_id: number): Promise<Order[]> {
    let response: Order[] = [];

    try {
      const resultOrders = await client.query<Order>(
        'SELECT * FROM "Order" WHERE user_id = $1',
        [user_id]
      );

      for (const order of resultOrders.rows) {
        const resultOrderDetails = await client.query<OrderDetail>(
          'SELECT * FROM "OrderDetail" WHERE order_id = $1',
          [order.id]
        )
        response.push({
          ...order,
          orderDetails: resultOrderDetails.rows
        });

      }
      return response;
    } catch (error) {
      throw new Error(`${error}`);
    }

  },

  // Other CRUD operations for the Order model (update, delete, getById, etc.)
};
