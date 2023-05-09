import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!");
})

app.get("/json", (req:Request, res:Response, next: NextFunction) => {
    res.json({
        "abc":"success"
    })
})

app.listen("3000", () => {
    console.log("Server running on port 3000!")
})