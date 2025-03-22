const responses = require("../../config/serverResponses");
const {
  handleSuccessResponse,
} = require("../../utilities/controllerUtilities");
const pricingService = require("./pricingService");

async function updatePricing(req, res) {
  const language = req.language;

  const currentPricing = pricingService.getPricingData();
  const updateData = pricingService.destructureUpdatePricingData({
    data: req.body,
  });

  const updatedPricing = {
    ...currentPricing,
    ...updateData,
  };

  pricingService.updatePricing({ data: updatedPricing });

  return handleSuccessResponse(
    res,
    responses.statusCodes.ok,
    responses.messages.pricing.pricingUpdated[language]
  );
}

module.exports = updatePricing;
