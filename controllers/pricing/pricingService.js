const path = require("path");
const { destructureData } = require("../../utilities/serviceUtilities");
const fs = require("fs");
const pricingFilePath = path.join(__dirname, "../../config/pricing.json");

class PricingService {
  getPricingData() {
    const data = fs.readFileSync(pricingFilePath, "utf8");
    return JSON.parse(data);
  }

  updatePricing({ data }) {
    return fs.writeFileSync(
      pricingFilePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }

  destructureUpdatePricingData({ data }) {
    return destructureData({
      data,
      keys: ["lessonPricePln", "lessonPriceEur", "lessonPriceUsd"],
    });
  }
}

const pricingService = new PricingService();

module.exports = pricingService;
