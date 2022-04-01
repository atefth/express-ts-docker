import { Task, TaskList } from "../types.d";
import { db } from "../db.connection";
import { OkPacket, RowDataPacket } from "mysql2";
import { now } from "../utils/date";

// Create
export const create = (task: Task, callback: Function) => {
  const queryString =
    "INSERT INTO tasks (title, description, updatedAt) VALUES (?, ?, NOW())";

  db.query(
    queryString,
    [task.title, task.description],
    (err, result) => {
      if (err) {
        callback(err);
      }

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

// Get By Id
export const findOne = (taskId: number, callback: Function) => {
  const queryString = `
      SELECT 
        *
      FROM tasks
      WHERE id=?`;

  db.query(queryString, taskId, (err, result) => {
    if (err) {
      callback(err);
    }

    const row = (<RowDataPacket>result)[0];
    if (!row) return callback(new Error("No record found!"));
    const task: Task = {
      id: row.id,
      title: row.title,
      description: row.description,
      updatedAt: row.updatedAt,
    };
    callback(null, task);
  });
};

// Get All
export const findAll = (callback: Function) => {
  const queryString = `
      SELECT *
      FROM tasks`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const tasks: Task[] = [];

    rows.forEach((row) => {
      const task: Task = {
        id: row.id,
        title: row.title,
        description: row.description,
        updatedAt: row.updatedAt,
      };
      tasks.push(task);
    });
    callback(null, tasks);
  });
};

// Update
export const update = (task: Task, callback: Function) => {
  const queryString = `UPDATE tasks SET title=?, description=?, updatedAt=? WHERE id=?`;

  db.query(queryString, [task.title, task.description, now(), task.id], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};

// Delete
export const remove = (taskId: number, callback: Function) => {
  const queryString = `DELETE from tasks WHERE id=?`;
  db.query(queryString, [taskId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};