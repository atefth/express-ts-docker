import request from "supertest";
import { now } from "../src/utils/date";
import { server } from "../src/server";

describe("Tasks", () => {
  describe("POST /tasks", () => {
    it("should create a new Task with title and updatedAt", async () => {
      const res = await request(server).post("/api/v1/tasks").send({
        title: "Test Task",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("taskId");
    });
    //   it("should not create a new Task without a title and updatedAt", async () => {
    //     const res = await request(server).post("/api/v1/tasks").send({description: "test"});
    //     expect(res.statusCode).toEqual(500);
    //   });
  });

  describe("GET /tasks/1", () => {
    it("should get the newly created Task", async () => {
      const res = await request(server).get("/api/v1/tasks/1").send();
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });

  describe("PUT /tasks/1", () => {
    it("should update the newly created Task", async () => {
      const res = await request(server).get("/api/v1/tasks/1").send({
        title: "New Title",
        updatedAt: now(),
      });
      expect(res.statusCode).toEqual(200);
    });
  });
});