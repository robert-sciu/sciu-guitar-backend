const {
  findAllRecords,
  updateRecord,
  findRecordByValue,
} = require("../../utilities/sequelizeUtilities");

const { PlanInfo } = require("../../models").sequelize.models;

const { destructureData } = require("../../utilities/serviceUtilities");

class PlanInfoService {
  async getPlanInfo({ userId }) {
    return await findRecordByValue({ model: PlanInfo, value: { userId } });
  }

  async getAllPlanInfos() {
    return await findAllRecords({ model: PlanInfo });
  }

  async updatePlanInfo({ planInfoId, updateData }) {
    return await updateRecord({
      model: PlanInfo,
      updateData: updateData,
      id: planInfoId,
    });
  }

  destructurePlanInfoUpdateData({ data }) {
    return destructureData({ data, keys: ["lessonBalance", "discount"] });
  }
}

const planInfoService = new PlanInfoService();

module.exports = planInfoService;
