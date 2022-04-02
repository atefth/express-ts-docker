import express, { Request, Response } from "express";
import * as taskModel from "../models/task";
import { Task } from "../types";
const taskRouter = express.Router({ mergeParams: true });

taskRouter.get("/", async (req: Request, res: Response) => {
  taskModel.findAll((err: Error, tasks: Task[]) => {
    if (err) {
      return res.status(500).json({ errorMessage: err.message });
    }

    res.status(200).json({ data: tasks });
  });
});

taskRouter.post("/", async (req: Request, res: Response) => {
  const newTask: Task = req.body;
  taskModel.create(newTask, (err: Error, taskId: number) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ taskId: taskId });
  });
});

taskRouter.get("/:id", async (req: Request, res: Response) => {
  const taskId: number = Number(req.params.id);
  if (!taskId) return res.status(500).json({ message: "No id provided!" });
  taskModel.findOne(taskId, (err: Error, task: Task) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ data: task });
  });
});

taskRouter.put("/:id", async (req: Request, res: Response) => {
  const task: Task = req.body;
  task.id = Number(req.params.id);
  if (!task.id) return res.status(500).json({ message: "No id provided!" });
  taskModel.update(task, (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).send();
  });
});

taskRouter.delete("/:id", async (req: Request, res: Response) => {
  if (!req.params.id)
    return res.status(500).json({ message: "No id provided!" });
  taskModel.remove(Number(req.params.id), (err: Error) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).send();
  });
});

export { taskRouter };
