const express = require("express");
const pricingController = require("../controllers/pricing");
const { validate } = require("../middleware/validator");
const { updatePricingValidator } = require("../validators/pricingValidator");

const pricingRouterOpen = () => {
  const router = express.Router();
  router.route("/").get(pricingController.getPricing);
  return router;
};

const pricingRouterAdmin = () => {
  const router = express.Router();
  router
    .route("/")
    .patch(updatePricingValidator, validate, pricingController.updatePricing);
  return router;
};

module.exports = { pricingRouterOpen, pricingRouterAdmin };
