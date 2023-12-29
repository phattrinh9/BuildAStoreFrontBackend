# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Check for route and payload example in document link: https://documenter.getpostman.com/view/21102224/2s9YkuaJX2
#### Products
- Index [token required] `'api/product/:id' [GET] (token)`
- Show [token required] `'api/product/getAll' [GET] (token)`
- Create [token required] `'api/product/' [POST] (token)`

#### Users
- Index [token required] `'api/user/:id' [GET] (token)`
- Show [token required] `'api/user/getAll' [GET] (token)`
- [ADD] Create `'api/user/signup' [POST]`
- [ADD] Get Token `'api/user/getToken' [POST]`

#### Orders
- Current Order by user (args: user id)[token required] `'api/order/current/:id' [GET] (token)`
- [ADD] Create [token required] `'api/order' [POST] (token)`
## Data Shapes
#### Product
- id
- name
- price

TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price REAL NOT NULL
);

#### User
- id
- first_name
- last_name
- user_name
- hasspassword 

TABLE users (
id SERIAL PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
username VARCHAR(255) NOT NULL,
hasspassword VARCHAR NOT NULL
);

#### Order
- id
- user_id 
- status_of_order 

TABLE Order (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
status VARCHAR(255)
);

#### OrderDetail
- id 
- order_id 
- product_id 
- quantity 

TABLE OrderDetail (
id SERIAL PRIMARY KEY,
order_id INTEGER REFERENCES Order(id),
product_id INTEGER REFERENCES Product(id),
quantity INTEGER NOT NULL,
);




