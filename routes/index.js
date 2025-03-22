const {
  authRouterOpen,
  authRouterProtected,
  authRouterAdmin,
} = require("./authentication");

const { sanitize } = require("../middleware/sanitization");
const { detectLanguage } = require("../middleware/languageDetector");

// const express = require("express");
const {
  authenticateJWT,
  authenticateAdminJWT,
} = require("../middleware/authenticationMiddleware");
const {
  userRouterOpen,
  userRouterProtected,
  userRouterAdmin,
} = require("./users");
const { planInfoRouterProtected, planInfoRouterAdmin } = require("./planInfo");
const { pricingRouterOpen, pricingRouterAdmin } = require("./pricing");
const {
  lessonReservationRouterProtected,
  lessonReservationRouterAdmin,
} = require("./lessonReservation");

const apiBaseUrl = process.env.API_BASE_URL;

const openRoutes = (app) => {
  app.use(detectLanguage);
  app.use(`${apiBaseUrl}/open/auth`, sanitize, authRouterOpen());
  app.use(`${apiBaseUrl}/open/users`, sanitize, userRouterOpen());
  app.use(`${apiBaseUrl}/open/pricing`, sanitize, pricingRouterOpen());
};
//prettier-ignore
const protectedRoutes = (app) => {
  app.use(sanitize)
  app.use(authenticateJWT)
  app.use(detectLanguage)
  app.use(`${apiBaseUrl}/auth`, sanitize, authRouterProtected());
  app.use(`${apiBaseUrl}/users`, sanitize, userRouterProtected());
  app.use(`${apiBaseUrl}/planInfo`, sanitize, planInfoRouterProtected());
  app.use(`${apiBaseUrl}/lessonReservation`, sanitize, lessonReservationRouterProtected());
  // app.use(`${apiBaseUrl}/tasks`, sanitize, tasksRouterProtected());
  // app.use(`${apiBaseUrl}/userTasks`, sanitize, userTasksRouterProtected());
  // app.use(`${apiBaseUrl}/tags`, sanitize, tagsRouterOpen());
  // app.use(`${apiBaseUrl}/taskTags`, sanitize, taskTagsRouter);
  // app.use(`${apiBaseUrl}/pageTexts`, sanitize, pageTextsRouter);
  // // app.use(`${apiBaseUrl}/pageImages`, sanitize, pageImagesRouter);
  // app.use(`${apiBaseUrl}/youTubeVideos`, sanitize, youTubeVideosRouter);
  // //prettier-ignore
  // app.use(`${apiBaseUrl}/reset`, dbResetRouter);
  
}

const adminRoutes = (app) => {
  app.use(sanitize);
  app.use(authenticateAdminJWT);
  app.use(detectLanguage);
  app.use(`${apiBaseUrl}/admin/auth`, sanitize, authRouterAdmin());
  app.use(`${apiBaseUrl}/admin/users`, sanitize, userRouterAdmin());
  //prettier-ignore
  app.use(`${apiBaseUrl}/admin/planInfo`, sanitize, planInfoRouterAdmin());
  app.use(`${apiBaseUrl}/admin/pricing`, sanitize, pricingRouterAdmin());
  //prettier-ignore
  app.use(`${apiBaseUrl}/admin/lessonReservation`, sanitize, lessonReservationRouterAdmin());

  // app.use(`${apiBaseUrl}/admin/tasks`, sanitize, tasksRouterAdmin());
  // app.use(`${apiBaseUrl}/admin/userTasks`, sanitize, userTasksRouterAdmin());
  // app.use(`${apiBaseUrl}/admin/tags`, sanitize, tagsRouterAdmin());
  // app.use(`${apiBaseUrl}/admin/pageImages`, sanitize, pageImagesRouterAdmin());
};

module.exports = (app) => {
  openRoutes(app);
  protectedRoutes(app);
  adminRoutes(app);
};
