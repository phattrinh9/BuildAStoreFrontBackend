export interface Order {
    id: number;
    user_id: number;
    status_of_order: string;
    orderDetails: OrderDetail[];
};

export interface OrderDetail {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;

};