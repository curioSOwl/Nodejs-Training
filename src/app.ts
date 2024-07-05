import express from "express";
import { Request, Response } from "express";
import employeeRouter from "./routes/employee.routes";
import loggerMiddleWare from "./middleware/logger.middleware";
import bodyParser from "body-parser";
import dataSource from "./db/data-source.db";
import errorMiddleware from "./middleware/error.middleware";

const server = express();

server.use(bodyParser.json());
server.use(loggerMiddleWare);
server.use("/employees", employeeRouter);
server.use(errorMiddleware);

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hellow world");
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed to connect to db", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
