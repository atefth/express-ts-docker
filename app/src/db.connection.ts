import mysql from "mysql2";
import * as dotenv from "dotenv";
dotenv.config();

const port = process.env.MYSQL_LOCAL_PORT || "3306";

// Create the connection pool. The pool-specific settings are the defaults
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(port),
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: `${process.env.DB_NAME}_${process.env.NODE_ENV}`,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 2,
});
