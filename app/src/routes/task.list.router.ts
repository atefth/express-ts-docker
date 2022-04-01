import express, { Request, Response } from "express";
import * as taskListModel from "../models/task.list";
import { TaskList } from "../types.d";
const taskListRouter = express.Router();

taskListRouter.get("/", async (req: Request, res: Response) => {
  taskListModel.findAll((err: Error, taskLists: TaskList[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: taskLists });
  });
});

taskListRouter.post("/", async (req: Request, res: Response) => {
  const newTaskList: TaskList = req.body;
  taskListModel.create(newTaskList, (err: Error, taskListId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ taskListId: taskListId });
  });
});

taskListRouter.get("/:id", async (req: Request, res: Response) => {
  const taskListId: number = Number(req.params.id);
  if (!taskListId) return res.status(500).json({ message: "No id provided!" });
  taskListModel.findOne(taskListId, (err: Error, taskList: TaskList) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ data: taskList });
  });
});

taskListRouter.put("/:id", async (req: Request, res: Response) => {
  const taskList: TaskList = req.body;
  taskList.id = Number(req.params.id);
  if (!taskList.id) return res.status(500).json({ message: "No id provided!" });
  taskListModel.update(taskList, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).send();
  });
});

taskListRouter.delete("/:id", async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(500).json({ message: "No id provided!" });
  taskListModel.remove(Number(req.params.id), (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).send();
  });
});

export { taskListRouter };
