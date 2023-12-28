import { OrderModel } from '../../models/ordersModel';
import { Order } from '../../entities/Order'
import { UserModel } from '../../models/usersModel';
import { User } from '../../entities/User';
import { ProductModel } from '../../models/productsModel';
import { Product } from '../../entities/Product';

// const order: Order = {
//   id: -1,
//   name: 'order_name_test',
//   price: 90
// }

describe('Order model testing', () => {
    let order: Order, user_id: number, product_id: number;
    beforeAll(async () => {
        const user: User = await UserModel.create({
            id: -1,
            user_name: 'Phat',
            first_name: 'Phat',
            last_name: 'Trinh',
            hashpassword: 'hashpassword',
        });

        user_id = user.id;

        const product: Product = await ProductModel.create({
            id: -1,
            name: 'Product name',
            price: 20,
        });

        product_id = product.id;

        order = {
            id: 1,
            user_id: 1,
            status_of_order: 'active',
            orderDetails: [
                {
                    id: 1,
                    order_id: 1,
                    product_id: 1,
                    quantity: 5
                }
            ]
        };
    });

    it('Should have create method', () => {
        expect(OrderModel.create).toBeDefined();
    });
    it('Should have get order by user id ', () => {
        expect(OrderModel.getOrderByUserId).toBeDefined();
    });


    it('Should create order', async () => {
        const result = await OrderModel.create(order);
        expect(result).not.toBeNull();
    });

    it('Should show order by user id', async () => {
        const result = await OrderModel.getOrderByUserId(1);
        expect(result).not.toBeNull();
    });

});