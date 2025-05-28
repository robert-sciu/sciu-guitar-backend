const {
  authRouterOpen,
  authRouterProtected,
  authRouterAdmin,
} = require("./authentication");
const { sanitize } = require("../middleware/sanitization");
const { detectLanguage } = require("../middleware/languageDetector");
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
const { tagsRouterAdmin, tagsRouterProtected } = require("./tags");
const { tasksRouterProtected, tasksRouterAdmin } = require("./tasks");
const { pageImagesRouterOpen, pageImagesRouterAdmin } = require("./pageImages");
const { pageTextsRouterOpen, pageTextsRouterAdmin } = require("./pageTexts");
const {
  youTubeVideoRouterOpen,
  youTubeVideoRouterAdmin,
} = require("./youTubeVideos");
const {
  userTasksRouterAdmin,
  userTasksRouterProtected,
} = require("./userTasks");
const { taskTagsRouterProtected, taskTagsRouterAdmin } = require("./taskTags");

const apiBaseUrl = process.env.API_BASE_URL;

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API documentation generated from code",
    },
  },
  apis: ["./routes/*.js"], // Point to your routes files
};

// Generate Swagger docs
const swaggerSpec = swaggerJsdoc(options);
const YAML = require("yamljs");
const path = require("path");
// const swaggerDocument = YAML.load(path.join(__dirname, "../docs", "3.0.yml"));

const openRoutes = (app) => {
  app.use(detectLanguage);
  app.use(sanitize);
  app.use(`${apiBaseUrl}/open/auth`, authRouterOpen());
  app.use(`${apiBaseUrl}/open/users`, userRouterOpen());
  app.use(`${apiBaseUrl}/open/pricing`, pricingRouterOpen());
  app.use(`${apiBaseUrl}/open/pageImages`, pageImagesRouterOpen());
  app.use(`${apiBaseUrl}/open/pageTexts`, pageTextsRouterOpen());
  //prettier-ignore
  app.use(`${apiBaseUrl}/open/youTubeVideos`,  youTubeVideoRouterOpen());
  app.use(
    `${apiBaseUrl}/open/apiDocs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
};
//prettier-ignore
const protectedRoutes = (app) => {
  app.use(sanitize)
  app.use(authenticateJWT)
  app.use(detectLanguage)
  app.use(`${apiBaseUrl}/auth`,  authRouterProtected());
  app.use(`${apiBaseUrl}/users`,  userRouterProtected());
  app.use(`${apiBaseUrl}/planInfo`,  planInfoRouterProtected());
  app.use(`${apiBaseUrl}/lessonReservation`,  lessonReservationRouterProtected());
  app.use(`${apiBaseUrl}/tasks`,  tasksRouterProtected());
  app.use(`${apiBaseUrl}/userTasks`,  userTasksRouterProtected());
  app.use(`${apiBaseUrl}/tags`,  tagsRouterProtected());
  app.use(`${apiBaseUrl}/taskTags`,  taskTagsRouterProtected());
  
}

const adminRoutes = (app) => {
  app.use(sanitize);
  app.use(authenticateAdminJWT);
  app.use(detectLanguage);
  app.use(`${apiBaseUrl}/admin/auth`, authRouterAdmin());
  app.use(`${apiBaseUrl}/admin/users`, userRouterAdmin());
  //prettier-ignore
  app.use(`${apiBaseUrl}/admin/planInfo`,  planInfoRouterAdmin());
  app.use(`${apiBaseUrl}/admin/pricing`, pricingRouterAdmin());
  //prettier-ignore
  app.use(`${apiBaseUrl}/admin/lessonReservation`,  lessonReservationRouterAdmin());
  app.use(`${apiBaseUrl}/admin/tasks`, tasksRouterAdmin());
  app.use(`${apiBaseUrl}/admin/userTasks`, userTasksRouterAdmin());
  app.use(`${apiBaseUrl}/admin/tags`, tagsRouterAdmin());
  app.use(`${apiBaseUrl}/admin/pageImages`, pageImagesRouterAdmin());
  app.use(`${apiBaseUrl}/admin/pageTexts`, pageTextsRouterAdmin());
  //prettier-ignore
  app.use(`${apiBaseUrl}/admin/youTubeVideos`,  youTubeVideoRouterAdmin());
  app.use(`${apiBaseUrl}/admin/taskTags`, taskTagsRouterAdmin());
};

module.exports = (app) => {
  openRoutes(app);
  protectedRoutes(app);
  adminRoutes(app);
};
