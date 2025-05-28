const userService = require("../../controllers/users/userService");
const { User, PlanInfo, Task, UserTask } =
  require("../../models").sequelize.models;

require("dotenv").config();
const request = require("supertest");
const app = require("../../app");

async function createTestUser() {
  const user = {
    username: "robert",
    email: "gitara.rs@gmail.com",
    password: "user1234",
    role: "user",
    difficultyClearanceLevel: 44,
    minimumTaskLevelToDisplay: 1,
    isVerified: true,
    isActive: true,
  };
  const planInfo = {
    lessonBalance: 10,
    lessonCount: 223,
    cancelledLessonCount: 0,
    rescheduledLessonCount: 0,
    discount: 10,
  };

  const newUser = await User.create(user);
  await PlanInfo.create({ ...planInfo, userId: newUser.id });
  return newUser;
}

async function createTestAdminUser() {
  const user = {
    username: "admin",
    email: "robert.sciu@gmail.com",
    password: await userService.hashPassword("admin1234"),
    role: "admin",
    difficultyClearanceLevel: 999,
    minimumTaskLevelToDisplay: 1,
    isVerified: true,
    isActive: true,
  };
  const planInfo = {
    lessonBalance: 5,
    lessonCount: 223,
    cancelledLessonCount: 0,
    rescheduledLessonCount: 0,
    discount: 10,
  };

  const newUser = await User.create(user);
  await PlanInfo.create({ ...planInfo, userId: newUser.id });
  return newUser;
}

async function createTestTask() {
  const taskData = {
    artist: "iron maiden",
    titlePl: "ulalala",
    titleEn: "ulalala",
    url: "youtube.com",
    youtubeUrl: "youtube.com",
    descriptionPl: "notatki",
    descriptionEn: "notes",
    difficultyLevel: 1,
  };

  const task = await Task.create(taskData);
  return task;
}

async function createUserTask() {
  const userTask = await UserTask.create({
    userId: 1,
    taskId: 1,
  });
  return userTask;
}

module.exports = {
  createTestUser,
  createTestAdminUser,
  createTestTask,
  createUserTask,
};
