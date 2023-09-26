import Sequelize from "sequelize";
import sequelizeDB from "../db.js";

const Application = sequelizeDB.define("application", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    jobPosition: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    interviewDescription: {
        type: Sequelize.TEXT,
        allowNull: true,
    }
});

export default Application;