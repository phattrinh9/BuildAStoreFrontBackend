import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_DB_TEST,
  POSTGRES_PORT_TEST,
  ENV
} = process.env

// let environment = ENV;
// console.log(environment);
let host, db, password, user, port;
// Load environment variables from the appropriate .env file based on ENV
if (ENV === 'test') {
  host = POSTGRES_HOST;
  db = POSTGRES_DB_TEST;
  user = POSTGRES_USER;
  password = POSTGRES_PASSWORD;
  port = POSTGRES_PORT_TEST;
} 
if (ENV === 'dev') {
  host = POSTGRES_HOST;
  db = POSTGRES_DB;
  user = POSTGRES_USER;
  password = POSTGRES_PASSWORD;
  port = POSTGRES_PORT;
}

const client = new Pool({
  host: host,
  database: db,
  user: user,
  password: password,
  port: parseInt(port as string) || 5432,
  ssl: false,
})

export default client;