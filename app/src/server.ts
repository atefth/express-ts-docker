import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { taskRouter } from "./routes/task.router";
import { taskListRouter } from "./routes/task.list.router";

export const server = express();
dotenv.config();
const apiVersion = 1;
const endPoints = {
  tasks: `/api/v${apiVersion}/tasks`,
  taskLists: `/api/v${apiVersion}/taskLists`,
};

server.use(bodyParser.json());

server.use(endPoints.tasks, taskRouter);
server.use(endPoints.taskLists, taskListRouter);
server.get("/", (req, res) => {
  res.json({
    apiVersion,
    endPoints,
  });
});

const port = process.env.NODE_LOCAL_PORT || "3000";
server.listen(parseInt(port), "0.0.0.0", () => {
  console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
