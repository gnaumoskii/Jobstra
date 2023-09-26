/* eslint-disable no-undef */
import { Sequelize } from "sequelize";

import dotenv  from "dotenv"
dotenv.config();

const sequelize = new Sequelize("jobstra-app", process.env.DB_USER, process.env.DB_PASSWORD, {dialect: "mysql", host: "localhost"});

export default sequelize;