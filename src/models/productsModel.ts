import client from "../database";
import { Product } from "../entities/Product";

export const ProductModel = {
  async create(product: Product): Promise<Product> {
    const result = await client.query<Product>(
      'INSERT INTO "Product" (name, price) VALUES ($1, $2) RETURNING *',
      [product.name, product.price]
    );
    return result.rows[0];
  },

  async getAllProducts(): Promise<Product[]> {
    const result = await client.query<Product>('SELECT * FROM "Product"');
    return result.rows;
  },

  async getProductById(id: number): Promise<Product> {
    const result = await client.query<Product>(
      'SELECT * FROM "Product" WHERE id = $1',
      [id]
    );
    return result.rows[0];
  },

  // Other CRUD operations for the Product model (update, delete, getById, etc.)
};
