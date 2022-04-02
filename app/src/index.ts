import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { taskRouter } from "./routes/task.router";
import { taskListRouter } from "./routes/task.list.router";

export const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

export const apiVersion = 1;
export const endPoints = {
  tasks: `/api/v${apiVersion}/tasks`,
  taskLists: `/api/v${apiVersion}/taskLists`,
};

app.use(endPoints.tasks, taskRouter);
app.use(endPoints.taskLists, taskListRouter);
app.get("/", (req, res) => {
  res.json({
    apiVersion,
    endPoints,
  });
});