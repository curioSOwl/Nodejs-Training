// const http = require("express");
// const server = new express();

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.writeHead(200);
//   res.end("Hello world");
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

const express = require("express");

const server = new express();

server.get("/", (req, res) => {
  console.log(req.url);
  res.status(200).send("Hellow world");
});

server.get("/employee", (req, res) => {
  console.log(req.url);
  res.status(200).send("I am Aparna");
});

server.get("/getData", (req, res) => {
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
