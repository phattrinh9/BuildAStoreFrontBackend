# API Docs
## API intro

Order API.
User API.

The main API is a [REST](http://localhost:3000/api)

## API showcase

#### Order API.
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

#### User API
+ Show all user [GET] (/user/users)
    + Token: require bearer token
+ Login [POST] (/user/login) req.body(User)
    + Token: require bearer token
    + Param: req.body(User)
+ Signup [POST] (/user/signup) req.body(User)
    + Param: req.body(User)

## API Sample req body (Example)
#### User: 
+ {
    "username":"user",
    "password":"user2412"
}
#### Order:
+ {
    "customer_id": 2,
    "product_id": 3,
    "quantity": 1,
    "order_date": "2022-10-31T17:00:00.000Z"
}

## Setup environment (.env)
TOKEN_SECRET=${YOUR_TOKEN}

POSTGRES_HOST=${DB_HOST_DEV}
POSTGRES_DB=${DB_NAME_DB_DEV}
POSTGRES_USER=${DB_USER_DEV}
POSTGRES_PASSWORD=${DB_PASSWORD_DEV}
POSTGRES_PORT=${DB_PORT_DEV}

## How to run API resources
- start: ```npm run start```
- test: ```npm run test```
- migrate up: ```db-migrate down -e dev ```
- migrate down:  ```db-migrate down -e dev ```

- To start API application: 
    - run:  ```db-migrate up -e dev ```
            ```npm run start```
            ```db-migrate down -e dev ```
- To test API application: 
    - run:  ```npm run test```


asyncapi: '2.6.0'
info:
  title: Streetlights Kafka API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈
  license:
    name: Apache 2.0
    url: https://www.apache.org/licenses/LICENSE-2.0

servers:
  scram-connections:
    url: test.mykafkacluster.org:18092
    protocol: kafka-secure
    description: Test broker secured with scramSha256
    security:
      - saslScram: []
    tags:
      - name: "env:test-scram"
        description: "This environment is meant for running internal tests through scramSha256"
      - name: "kind:remote"
        description: "This server is a remote server. Not exposed by the application"
      - name: "visibility:private"
        description: "This resource is private and only available to certain users"  
  mtls-connections:
    url: test.mykafkacluster.org:28092
    protocol: kafka-secure
    description: Test broker secured with X509
    security:
      - certs: []
    tags:
      - name: "env:test-mtls"
        description: "This environment is meant for running internal tests through mtls"
      - name: "kind:remote"
        description: "This server is a remote server. Not exposed by the application"
      - name: "visibility:private"
        description: "This resource is private and only available to certain users"

defaultContentType: application/json

channels:
  smartylighting.streetlights.1.0.event.{streetlightId}.lighting.measured:
    description: The topic on which measured values may be produced and consumed.
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      summary: Inform about environmental lighting conditions of a particular streetlight.
      operationId: receiveLightMeasurement
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/lightMeasured'

  smartylighting.streetlights.1.0.action.{streetlightId}.turn.on:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: turnOn
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting.streetlights.1.0.action.{streetlightId}.turn.off:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: turnOff
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting.streetlights.1.0.action.{streetlightId}.dim:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    subscribe:
      operationId: dimLight
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions of a particular streetlight.
      contentType: application/json
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
    dimLight:
      name: dimLight
      title: Dim light
      summary: Command a particular streetlight to dim the lights.
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/dimLightPayload"

  schemas:
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          minimum: 0
          description: Light intensity measured in lumens.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    turnOnOffPayload:
      type: object
      properties:
        command:
          type: string
          enum:
            - on
            - off
          description: Whether to turn on or off the light.
        sentAt:
          $ref: "#/components/schemas/sentAt"
    dimLightPayload:
      type: object
      properties:
        percentage:
          type: integer
          description: Percentage to which the light should be dimmed to.
          minimum: 0
          maximum: 100
        sentAt:
          $ref: "#/components/schemas/sentAt"
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.

  securitySchemes:
    saslScram:
      type: scramSha256
      description: Provide your username and password for SASL/SCRAM authentication
    certs:
      type: X509
      description: Download the certificate files from service provider

  parameters:
    streetlightId:
      description: The ID of the streetlight.
      schema:
        type: string

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100

  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId:
            type: string
            enum: ['my-app-id']
