const express = require("express");
import { Request, Response } from "express";
import employeeRouter from "./employeeRouter";
import loggerMiddleWare from "./loggerMiddleware";
import bodyParser from "body-parser";
import dataSource from "./data-source";

const server = new express();

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hellow world");
});

server.use(bodyParser.json());
server.use(loggerMiddleWare);
server.use("/employees", employeeRouter);

interface profile {
  age: number;
  name: string;
}

interface data {
  profile: profile;
}

server.get("/getData", (req: Request, res: Response) => {
  let data = {
    profile: {
      name: "Aparna",
      age: 23,
    },
  };
  console.log(data.profile.name);
  res.status(200).send(data);
});

(async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.log("Failed", e);
    process.exit(1);
  }
  server.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})();
