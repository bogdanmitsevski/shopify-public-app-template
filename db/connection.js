import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";
export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        port: process.env.DB_PORT,
        dialect: "postgres",
        host: 'localhost'
    })
