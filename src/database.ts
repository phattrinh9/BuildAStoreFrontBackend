import dotenv from 'dotenv'
import { Pool } from 'pg'


dotenv.config();
let {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  TEST_POSTGRES_HOST,
  TEST_POSTGRES_DB,
  TEST_POSTGRES_USER,
  TEST_POSTGRES_PASSWORD,
  TEST_POSTGRES_PORT,
} = process.env

let host, db, password, user, port;
// Load environment variables from the appropriate .env file based on NODE_ENV
// if (process.env.NODE_ENV === 'test') {
//   host = process.env.TEST_POSTGRES_HOST;
//   db = process.env.TEST_POSTGRES_DB;
//   user = process.env.TEST_POSTGRES_USER;
//   password = process.env.TEST_POSTGRES_PASSWORD;
//   port = process.env.TEST_POSTGRES_PORT;
// } else if (process.env.NODE_ENV === 'dev') {
//   host = process.env.POSTGRES_HOST;
//   db = process.env.POSTGRES_DB;
//   user = process.env.POSTGRES_USER;
//   password = process.env.POSTGRES_PASSWORD;
//   port = process.env.POSTGRES_PORT;
// }

const client = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432 ,
  ssl: false,
})

export default client