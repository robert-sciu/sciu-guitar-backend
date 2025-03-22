const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../../utilities/controllerUtilities");
const responses = require("../../config/serverResponses");
const logger = require("../../utilities/logger");
const pricingService = require("./pricingService");

async function getPricing(req, res) {
  const language = req.language;
  try {
    const pricingData = await pricingService.getPricingData();

    return handleSuccessResponse(res, responses.statusCodes.ok, pricingData);
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(
      res,
      responses.statusCodes.internalServerError,
      responses.errors.serverError[language]
    );
  }
}

module.exports = getPricing;
