import * as dotenv from "dotenv";
import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
import router from "./routes";

dotenv.config();



const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
const HOST: string = process.env.HOST || "localhost";
const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use((req:Request, res:Response, next:NextFunction)=>{
    console.log(`Request occur! ${req.method}, ${req.url}`);
    next();
})

app.use("/", router);

app.listen(PORT, HOST, async () => {
    console.log(`server on : listening on ${HOST}:${PORT}`);
})