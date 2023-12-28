-- Create Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC NOT NULL
);

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    hashpassword VARCHAR(255) NOT NULL
);

-- -- Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES "User"(id),
    status_of_order VARCHAR(255) NOT NULL
);

-- Create Order table
CREATE TABLE IF NOT EXISTS "OrderDetail" (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES "Order"(id),
    product_id INTEGER REFERENCES "Product"(id),
    quantity INTEGER NOT NULL
);
-- Insert default data into Product table
INSERT INTO "Product" (name, price) VALUES
    ('Product A', 10.99),
    ('Product B', 19.99),
    ('Product C', 9);

-- Insert default data into User table
INSERT INTO "User" (user_name, first_name, last_name, hashpassword) VALUES
    ('user1', 'John', 'Doe', 'password123'),
    ('user2', 'Jane', 'Smith', 'securepwd');

-- Insert default data into Order table
INSERT INTO "Order" (user_id, status_of_order) VALUES
    (1, 'complete'),
    (2, 'active');

-- Insert default data into Order table
INSERT INTO "OrderDetail" (order_id, product_id, quantity) VALUES
    (1, 1, 1),
    (1, 2, 1),
    (2, 2, 1);
