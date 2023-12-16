/* Replace with your SQL commands */
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    hashedPassword VARCHAR NOT NULL
); 

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
); 

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(customer_id),
    product_id INT NOT NULL REFERENCES products(product_id),
    quantity INT NOT NULL,
    order_date DATE NOT NULL
);

-- -- Insert data into users table
-- INSERT INTO users (username, password)
-- VALUES 
--   ('user1', 'hashed_password_user1'),
--   ('user2', 'hashed_password_user2');

-- -- Insert data into customers table
-- INSERT INTO customers (customer_name, email) VALUES ('Customer G', 'customerA@example.com');
-- INSERT INTO customers (customer_name, email) VALUES ('Customer B', 'customerB@example.com');
-- INSERT INTO customers (customer_name, email) VALUES ('Customer C', 'customerC@example.com');
-- INSERT INTO customers (customer_name, email) VALUES ('Customer D', 'customerD@example.com');


-- -- Insert data into products table
-- INSERT INTO products (product_name, price) VALUES ('Product A', 10.00);
-- INSERT INTO products (product_name, price) VALUES ('Product B', 20.99);
-- INSERT INTO products (product_name, price) VALUES ('Product C', 30.99);
-- INSERT INTO products (product_name, price) VALUES ('Product D', 40.00);

-- -- Insert data into orders table
-- INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES (1, 2, 5, '2023-12-01');
-- INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES (1, 3, 3, '2022-11-01');
-- INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES (3, 1, 5, '2023-02-01');
-- INSERT INTO orders (customer_id, product_id, quantity, order_date) VALUES (4, 4, 2, '2023-12-01');