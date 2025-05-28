const express = require("express");
const router = express.Router();
const lessonReservationController = require("../controllers/lessonReservations");
const { attachIdParam } = require("../middleware/commonMiddleware");
const {
  createLessonReservationValidator,
  updateLessonReservationValidator,
} = require("../validators/lessonReservationValidator");
const { validate } = require("../middleware/validator");
const { idValidator } = require("../validators/commonValidator");

router
  .route("/:id")
  .patch(attachIdParam, lessonReservationController.updateLessonReservation)
  .delete(attachIdParam, lessonReservationController.deleteLessonReservation);

const lessonReservationRouterProtected = () => {
  const router = express.Router();

  router
    .route("/")
    .get(lessonReservationController.getLessonReservations)
    .post(
      createLessonReservationValidator,
      validate,
      lessonReservationController.createLessonReservation
    );
  // id is reservation id
  router
    .route("/:id")
    .patch(
      idValidator,
      updateLessonReservationValidator,
      validate,
      attachIdParam,
      lessonReservationController.updateLessonReservation
    )
    .delete(
      idValidator,
      validate,
      attachIdParam,
      lessonReservationController.deleteLessonReservation
    );

  return router;
};

const lessonReservationRouterAdmin = () => {
  const router = express.Router();
  router
    .route("/")
    .post(
      createLessonReservationValidator,
      validate,
      lessonReservationController.createLessonReservation
    );
  // id is reservation id
  router
    .route("/:id")
    .patch(
      idValidator,
      updateLessonReservationValidator,
      validate,
      attachIdParam,
      lessonReservationController.updateLessonReservation
    )
    .delete(
      idValidator,
      validate,
      attachIdParam,
      lessonReservationController.deleteLessonReservation
    );
  return router;
};

module.exports = {
  lessonReservationRouterProtected,
  lessonReservationRouterAdmin,
};
