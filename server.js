import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import nichtGefundenHandler from "./controller/nichtGefundenController.js";

// import Router
import userRouter from "./routers/userRoute.js";
import taskRouter from "./routers/taskRoute.js";

// datenbank kontakt
const URL = process.env.MONGODB || "mongo://localhost:27017/todo";
mongoose
  .connect(URL)
  .then(() => console.log("Kontakt mit mongodb Erfolg"))
  .catch((error) => console.log("Kontakt nicht mit mongodb ", error));

// server middleware
const app = express();
// json Parser
app.use(express.json());

//Cors
app.use(cors());

//Morgan
app.use(morgan("dev"));

// Routes
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

// 404 Nicht gefunden
app.use(nichtGefundenHandler);

app.listen(process.env.PORT, () => {
  console.log("Server hört mit port " + process.env.PORT);
});
