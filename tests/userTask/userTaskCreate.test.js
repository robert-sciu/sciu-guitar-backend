require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { userTaskData } = require("./data");
const apiBaseUrl = process.env.API_BASE_URL;
const {
  createTestUser,
  createTestTask,
} = require("../utilities/dataCreationUtils");

describe("POST /userTask", () => {
  let user;
  let task;
  beforeEach(async () => {
    user = await createTestUser();
    task = (await createTestTask()).dataValues;
  });
  test("POST /userTask with valid id", async () => {
    const res = await request(app)
      .post(`${apiBaseUrl}/userTasks/create/${task.id}`)
      .send();
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
  });

  test("POST /userTask with valid id and userTask already exists", async () => {
    await request(app).post(`${apiBaseUrl}/userTasks/create/${task.id}`).send();

    const res = await request(app)
      .post(`${apiBaseUrl}/userTasks/create/${task.id}`)
      .send();
    expect(res.statusCode).toEqual(409);
    expect(res.body.success).toBe(false);
  });

  test("POST /userTask with not found taskId", async () => {
    const res = await request(app)
      .post(`${apiBaseUrl}/userTasks/create/123456789`)
      .send();
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });

  test("POST /userTask with invalid data", async () => {
    for (const invalid of userTaskData.invalid.taskIdList) {
      const res = await request(app)
        .post(`${apiBaseUrl}/userTasks/create/${invalid}`)
        .send();
      expect([403, 404]).toContain(res.statusCode);
      expect([undefined, false]).toContain(res.body.success);
    }
  });
});
