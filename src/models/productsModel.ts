import client from "../database";
import { Product } from "../entities/Product";

export const ProductModel = {
  async create(product: Product): Promise<Product> {
    try {
      const result = await client.query<Product>(
        'INSERT INTO "Product" (name, price) VALUES ($1, $2) RETURNING *',
        [product.name, product.price]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }

  },

  async getAllProducts(): Promise<Product[]> {
    try {
      const result = await client.query<Product>('SELECT * FROM "Product"');
      return result.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }

  },

  async getProductById(id: number): Promise<Product> {
    try {
      const result = await client.query<Product>(
        'SELECT * FROM "Product" WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }

  },

  // Other CRUD operations for the Product model (update, delete, getById, etc.)
};
