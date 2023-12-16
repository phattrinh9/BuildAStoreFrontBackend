# API Docs

Order API.
User API.

The main API is a [REST](http://localhost:3000/api)

## API showcase

- Order API.
+ Show all order [GET](order/getAll)
+ Show order by id [GET](order/:id) 
+ Create order [POST](order) 
    + Param: req.body(Order)
+ Update order [PUT](order/:id) req.body(Order)
+ DELETE order [DELETE](order/:id)
- User API
+ Show all user [GET](user/users)
+ Login [POST](order/login) req.body(User)
+ Signup [POST] (order/signup) req.body(User)
### Sample of API
http://localhost:8080/api/images?name=palmtunnel&width=100&height=600

#### Available API resources
- encenadaport
- fjord
- icelandwaterfall
- palmtunnel
- santamonica

##### How to run API resources
- build: ```npm run build```
- run: ```npm run start```
- test: ```npm run test```
- eslint: ```npm run lint```
- prettier: ```npm run format```