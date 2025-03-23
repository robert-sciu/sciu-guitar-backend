const express = require("express");
const router = express.Router();
const lessonReservationController = require("../controllers/lessonReservations");
const { attachIdParam } = require("../middleware/commonMiddleware");

router
  .route("/:id")
  .patch(attachIdParam, lessonReservationController.updateLessonReservation)
  .delete(attachIdParam, lessonReservationController.deleteLessonReservation);

const lessonReservationRouterProtected = () => {
  const router = express.Router();

  router
    .route("/")
    .get(lessonReservationController.getLessonReservations)
    .post(lessonReservationController.createLessonReservation);
  // id is reservation id
  router
    .route("/:id")
    .patch(attachIdParam, lessonReservationController.updateLessonReservation)
    .delete(attachIdParam, lessonReservationController.deleteLessonReservation);

  return router;
};

const lessonReservationRouterAdmin = () => {
  const router = express.Router();
  router.route("/").post(lessonReservationController.createLessonReservation);
  // id is reservation id
  router
    .route("/:id")
    .patch(attachIdParam, lessonReservationController.updateLessonReservation)
    .delete(attachIdParam, lessonReservationController.deleteLessonReservation);
  return router;
};

module.exports = {
  lessonReservationRouterProtected,
  lessonReservationRouterAdmin,
};
