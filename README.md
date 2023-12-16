# API Docs

Order API.
User API.

The main API is a [REST](http://localhost:3000/api)

## API showcase

- Order API.
+ Show all order [GET] (/order/getAll)
    + Token: require bearer token
+ Show order by id [GET] (/order/:id) 
    + Token: require bearer token
+ Create order [POST] (/order) 
    + Token: require bearer token
    + Param: req.body(Order)
+ Update order [PUT] (/order/:id) 
    + Token: require bearer token
    + Param: req.body(Order)
+ DELETE order [DELETE] (/order/:id)
    + Token: require bearer token

- User API
+ Show all user [GET] (/user/users)
    + Token: require bearer token
+ Login [POST] (/user/login) req.body(User)
    + Token: require bearer token
    + Param: req.body(User)
+ Signup [POST] (/user/signup) req.body(User)
    + Param: req.body(User)

### API Sample req body
- User: 
+ {
    "username":"user",
    "password":"user2412"
}
- Order:
+ {
    "customer_id": 2,
    "product_id": 3,
    "quantity": 1,
    "order_date": "2022-10-31T17:00:00.000Z"
}


#### How to run API resources
- start: ```npm run start```
- test: ```npm run test```
- migrate up: ```db-migrate down -e dev ```
- migrate down:  ```db-migrate down -e dev ```

- To start API application: 
+ run:  ```db-migrate up -e dev ```
        ```npm run start```
        ```db-migrate down -e dev ```
- To test API application: 
+ run:  ```npm run test```