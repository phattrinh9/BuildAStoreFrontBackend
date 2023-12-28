import { ProductModel } from '../../models/productsModel';
import { Product } from '../../entities/Product'

const product: Product = {
  id: -1,
  name: 'product_name_test',
  price: 90
}

describe('Product model testing', () => {
  it('Should have create method', () => {
    expect(ProductModel.create).toBeDefined();
  });
  it('Should have get all product ', () => {
    expect(ProductModel.getAllProducts).toBeDefined();
  });
  it('Should have get prouduct with id ', () => {
    expect(ProductModel.getProductById).toBeDefined();
  });

  it('Create method should add a new product', async () => {
    const result = await ProductModel.create(product);
    expect(result).not.toBeNull;
  });

  it('Should show all product', async () => {
    const result = await ProductModel.getAllProducts();
    expect(result).not.toBeNull();
  });

  it('Should show product by id', async () => {
    const result = await ProductModel.getProductById(1);
    expect(result).not.toBeNull();
  });

});