import request from "supertest";
import { now } from "../src/utils/date";
import { app } from "../src";

describe("Tasks", () => {
  describe("POST /tasks", () => {
    it("should create a new Task with title and updatedAt", async () => {
      const res = await request(app).post("/api/v1/tasks").send({
        title: "Test Task",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("taskId");
    });
    //   it("should not create a new Task without a title and updatedAt", async () => {
    //     const res = await request(app).post("/api/v1/tasks").send({description: "test"});
    //     expect(res.statusCode).toEqual(500);
    //   });
  });

  describe("GET /tasks/1", () => {
    it("should get the newly created Task", async () => {
      const res = await request(app).get("/api/v1/tasks/1").send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("PUT /tasks/1", () => {
    it("should update the newly created Task", async () => {
      const res = await request(app).get("/api/v1/tasks/1").send({
        title: "New Title",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});

describe("TaskLists", () => {
  describe("POST /taskLists", () => {
    it("should create a new List with title and updatedAt", async () => {
      const res = await request(app).post("/api/v1/taskLists").send({
        title: "Test Task List",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("taskListId");
    });
    //   it("should not create a new Task without a title and updatedAt", async () => {
    //     const res = await request(app).post("/api/v1/taskLists").send({description: "test"});
    //     expect(res.statusCode).toEqual(500);
    //   });
  });

  describe("GET /taskLists/1", () => {
    it("should get the newly created List", async () => {
      const res = await request(app).get("/api/v1/taskLists/1").send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("PUT /taskLists/1", () => {
    it("should update the newly created List", async () => {
      const res = await request(app).get("/api/v1/taskLists/1").send({
        title: "New Title",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});
