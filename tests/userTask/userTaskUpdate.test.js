require("dotenv").config();
const request = require("supertest");
const app = require("../../app");
const { userTaskData } = require("./data");
const apiBaseUrl = process.env.API_BASE_URL;
const {
  createTestUser,
  createTestTask,
  createTestAdminUser,
  createUserTask,
} = require("../utilities/dataCreationUtils");

describe("PATCH /userTask", () => {
  let user;
  let task;
  let admin;
  let userTask;
  beforeEach(async () => {
    user = await createTestUser();
    admin = await createTestAdminUser();
    task = (await createTestTask()).dataValues;
    userTask = (await createUserTask()).dataValues;
  });
  test("PATCH /userTask with valid data", async () => {
    const res = await request(app)
      .patch(`${apiBaseUrl}/userTasks/userNotes/${userTask.id}`)
      .send({ userNotes: "test" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);

    const res2 = await request(app).get(`${apiBaseUrl}/userTasks`).send();
    expect(res2.body.data.length).toBe(1);
    expect(res2.body.data[0].userNotes).toBe("test");
  });

  test("PATCH /userTask with valid id and no userTask", async () => {
    const res = await request(app)
      .patch(`${apiBaseUrl}/userTasks/userNotes/1000`)
      .send({ userNotes: "valid" });
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
  test("PATCH /userTask with invalid id", async () => {
    for (const invalid of userTaskData.invalid.taskIdList) {
      const res = await request(app)
        .patch(`${apiBaseUrl}/userTasks/userNotes/${invalid}`)
        .send({ userNotes: "valid" });
      expect([403, 404]).toContain(res.statusCode);
      expect([undefined, false]).toContain(res.body.success);
    }
  });
  test("PATCH /userTask with invalid data", async () => {
    for (const invalid of userTaskData.invalid.userNotesList) {
      const res = await request(app)
        .patch(`${apiBaseUrl}/userTasks/userNotes/${userTask.id}`)
        .send({ userNotes: invalid });
      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    }
  });
  test("PATCH /userTask admin update with valid isCompleted", async () => {
    const res = await request(app)
      .patch(`${apiBaseUrl}/admin/userTasks/${userTask.id}`)
      .send({ isCompleted: true });
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  test("PATCH /userTask admin update with valid isCompleted and no userTask", async () => {
    const res = await request(app)
      .patch(`${apiBaseUrl}/admin/userTasks/1000`)
      .send({ isCompleted: true });
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });

  test("PATCH /userTask admin update with invalid isCompleted", async () => {
    for (const invalid of userTaskData.invalid.isCompletedList) {
      const res = await request(app)
        .patch(`${apiBaseUrl}/admin/userTasks/${userTask.id}`)
        .send({ isCompleted: invalid });
      expect(res.statusCode).toEqual(403);
      expect(res.body.success).toBe(false);
    }
  });
});
