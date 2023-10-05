import express from "express";
import sequelizeDB from "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// ROUTES
import applicationRoutes from "./routes/application.js";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
// MODELS
import Application from "./models/application.js";
import User from "./models/user.js"
// UTIL
import { authenticateToken } from "./middleware/cookieJWTAuth.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));



app.use("/applications", authenticateToken, applicationRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

Application.belongsTo(User, {constraints: true ,onDelete: "CASCADE"})
User.hasMany(Application);

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