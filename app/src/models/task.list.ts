import { Task, TaskList } from "../types.d";
import { db } from "../db.connection";
import { OkPacket, RowDataPacket } from "mysql2";
import { now } from "../utils/date";

// Create
export const create = (taskList: TaskList, callback: Function) => {
  const queryString =
    "INSERT INTO task_lists (title, description, updatedAt) VALUES (?, ?, ?)";

  db.query(
    queryString,
    [taskList.title, taskList.description, now()],
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
export const findOne = (taskListId: number, callback: Function) => {
  const queryString = `
      SELECT t.id           tId,
            tl.id          tLId,
            t.title        tTitle,
            tl.title       tLTitle,
            t.description  tDescription,
            tl.description tLDescription,
            t.updatedAt    tUpdatedAt,
            tl.updatedAt   tLUpdatedAt
      FROM task_lists tl
        LEFT JOIN tasks_task_lists ttl
          ON tl.id = ttl.taskListId
        LEFT JOIN tasks t
          ON t.id = ttl.taskId
      WHERE tl.id=?`;

  db.query(queryString, taskListId, (err, result) => {
    if (err) {
      callback(err);
    }
    const rows = <RowDataPacket[]>result;
    if (rows?.length) {
      const taskList: TaskList = {
        id: rows[0].tLId,
        title: rows[0].tLTitle,
        description: rows[0].tLDescription,
        updatedAt: rows[0].tLUpdatedAt,
        tasks:
          rows.length === 1
            ? rows[0].tId > 0
              ? [
                  {
                    id: rows[0].tId,
                    title: rows[0].tTitle,
                    description: rows[0].tDescription,
                    updatedAt: rows[0].tUpdatedAt,
                  },
                ]
              : []
            : rows.map(({ tId, tTitle, tDescription, tUpdatedAt }) => ({
                id: tId,
                title: tTitle,
                description: tDescription,
                updatedAt: tUpdatedAt,
              })),
      };
      callback(null, taskList);
    } else {
      callback(new Error("Record not found!"));
    }
  });
};

// Get All
export const findAll = (callback: Function) => {
  const queryString = `
      SELECT t.id           tId,
            tl.id          tLId,
            t.title        tTitle,
            tl.title       tLTitle,
            t.description  tDescription,
            tl.description tLDescription,
            t.updatedAt    tUpdatedAt,
            tl.updatedAt   tLUpdatedAt
      FROM task_lists tl
        LEFT JOIN tasks_task_lists ttl
          ON tl.id = ttl.taskListId
        LEFT JOIN tasks t
          ON t.id = ttl.taskId`;

  db.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    }

    const rows = <RowDataPacket[]>result;
    const taskLists: { [key: number]: TaskList } = {};

    rows.forEach(
      ({
        tId,
        tTitle,
        tDescription,
        tUpdatedAt,
        tLId,
        tLTitle,
        tLDescription,
        tLUpdatedAt,
      }) => {
        if (!taskLists[tLId]) {
          taskLists[tLId] = {
            id: tLId,
            title: tLTitle,
            description: tLDescription,
            updatedAt: tLUpdatedAt,
            tasks:
              tId > 0
                ? [
                    {
                      id: tId,
                      title: tTitle,
                      description: tDescription,
                      updatedAt: tUpdatedAt,
                    },
                  ]
                : [],
          };
        } else if (tId > 0) {
          taskLists[tLId].tasks.push({
            id: tId,
            title: tTitle,
            description: tDescription,
            updatedAt: tUpdatedAt,
          });
        }
      }
    );
    const arrayList = Object.keys(taskLists).map(
      (taskListId) => taskLists[parseInt(taskListId)]
    );
    callback(null, arrayList);
  });
};

// Update
export const update = (taskList: TaskList, callback: Function) => {
  const queryString = `UPDATE task_lists SET title=?, description=?, updatedAt=? WHERE id=?`;

  db.query(
    queryString,
    [taskList.title, taskList.description, now(), taskList.id],
    (err, result) => {
      if (err) {
        callback(err);
      }
      callback(null);
    }
  );
};

// Delete
export const remove = (taskListId: number, callback: Function) => {
  const queryString = `DELETE from task_lists WHERE id=?`;
  db.query(queryString, [taskListId], (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null);
  });
};