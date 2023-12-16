import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import userRouter from "./routes/usersRoutes";
import orderRouter from "./routes/ordersRoutes";


const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.use('/api/user', userRouter)

app.use('/api/order', orderRouter)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app