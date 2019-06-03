const express = require("express");
const server = express();

const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");

server.use(express.json());

server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

module.exports = server;
