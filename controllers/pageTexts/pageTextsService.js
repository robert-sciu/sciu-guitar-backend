const path = require("path");
const { destructureData } = require("../../utilities/serviceUtilities");
const fs = require("fs");
const pageTextsFilePath = path.join(__dirname, "../../config/pageTexts.json");
const config = require("../../config/config")[process.env.NODE_ENV];

class PageTextsService {
  getPageTexts() {
    const data = fs.readFileSync(pageTextsFilePath, "utf8");
    return JSON.parse(data);
  }

  mergeUpdateWithCurrentTexts({ pageTexts, textsUpdate }) {
    const updatedTexts = {
      pl: {
        ...pageTexts.pl,
        ...textsUpdate.pl,
      },
      en: {
        ...pageTexts.en,
        ...textsUpdate.en,
      },
    };
    return updatedTexts;
  }

  formatTextsUpdate({ data }) {
    return {
      pl: { [data.role]: data.contentPl },
      en: { [data.role]: data.contentEn },
    };
  }

  isTextRoleValid({ role }) {
    return config.pageTextRoles.includes(role);
  }

  updatePageTexts({ data }) {
    return fs.writeFileSync(
      pageTextsFilePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  }

  destructureUpdatePageTextData({ data }) {
    return destructureData({
      data,
      keys: ["role", "contentPl", "contentEn"],
    });
  }
}

const pageTextsService = new PageTextsService();

module.exports = pageTextsService;
