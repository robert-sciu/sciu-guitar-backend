const {
  findRecordByFk,

  findAllRecords,
  updateRecord,
} = require("../../utilities/sequelizeUtilities");

const { PlanInfo } = require("../../models").sequelize.models;

const { destructureData } = require("../../utilities/serviceUtilities");

class PlanInfoService {
  async getPlanInfo({ userId }) {
    return await findRecordByFk({ model: PlanInfo, id: userId });
  }

  async getAllPlanInfos() {
    return await findAllRecords({ model: PlanInfo });
  }

  async updatePlanInfo({ userId, updateData }) {
    return await updateRecord({
      model: PlanInfo,
      updateData: updateData,
      id: userId,
    });
  }

  destructurePlanInfoUpdateData({ data }) {
    return destructureData({ data, keys: ["lessonBalance", "discount"] });
  }
}

const planInfoService = new PlanInfoService();

module.exports = planInfoService;
