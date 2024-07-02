const express = require("express");
import { Request, Response } from "express";
const server = new express();

server.get("/", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("Hellow world");
});

server.get("/employee", (req: Request, res: Response) => {
  console.log(req.url);
  res.status(200).send("I am Aparna");
});

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

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
