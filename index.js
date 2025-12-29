import dotenv, { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import connectToDatabase from "./database.js";
import { startServer } from "./serverInit.js";

config();
const app = express();
dotenv.config();

app.use(cors());
app.use(
  cors({
    origin: `${process.env.PROTOCAL}://${process.env.DB_HOST}:${process.env.FE_PORT}`,
    credentials: true,
  })
);
app.use(json());
await connectToDatabase();

const port = process.env.PORT || 8080;

await startServer(port, app);
