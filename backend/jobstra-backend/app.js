import express from "express";
import sequelizeDB from "./db.js";
import applicationRoutes from "./routes/application.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/applications", applicationRoutes);

const syncDb = async () => {
    try {
        await sequelizeDB.sync();
        console.log("Successfully connected and synced to database.")
    } catch (error) {
        console.log(error);
    }
}

syncDb();


app.listen(3000);