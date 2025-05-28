const planInfoController = require("../controllers/planInfo");

const { attachIdParam } = require("../middleware/commonMiddleware");
const express = require("express");
const { updatePlanInfoValidator } = require("../validators/planInfoValidator");
const { idValidator } = require("../validators/commonValidator");
const { validate } = require("../middleware/validator");

const planInfoRouterProtected = () => {
  const router = express.Router();
  router.route("/").get(planInfoController.getPlanInfo);

  return router;
};

const planInfoRouterAdmin = () => {
  const router = express.Router();
  router.route("/").get(planInfoController.getAllPlanInfos);
  router
    .route("/:id")
    .patch(
      updatePlanInfoValidator,
      idValidator,
      validate,
      attachIdParam,
      planInfoController.updatePlanInfo
    );

  return router;
};

module.exports = {
  planInfoRouterProtected,
  planInfoRouterAdmin,
};
