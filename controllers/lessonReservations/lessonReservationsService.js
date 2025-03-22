const { destructureData } = require("../../utilities/serviceUtilities");
const { LessonReservation, PlanInfo } =
  require("../../models").sequelize.models;
// const {
//   checkIfReservationDateIsAllowed,
//   checkForOverlapingReservations,
// } = require("../../utilities/lessonReservationControllerUtilities");
const config = require("../../config/config")[process.env.NODE_ENV];
const {
  findRecordByPk,
  findRecordByFk,
  updateRecord,
  deleteRecord,
  createRecord,
  findAllRecords,
} = require("../../utilities/sequelizeUtilities");
const {
  checkIfReservationDateIsAllowed,
  checkForOverlapingReservations,
} = require("../../utilities/lessonReservationUtilities");

class LessonReservationsService {
  async veryfyReservationData({ reservationData }) {
    try {
      //prettier-ignore
      checkIfReservationDateIsAllowed({ reservationData });
      await checkForOverlapingReservations({ reservationData });
      return { error: false, errorMsg: {} };
    } catch (error) {
      return { error: true, errorMsg: JSON.parse(error.message) };
    }
  }

  async createReservation({ data }) {
    return await createRecord({ model: LessonReservation, data });
  }

  async getAllReservations() {
    return await findAllRecords({ model: LessonReservation });
  }

  createReservationData({ data, user }) {
    const now = new Date();
    now.setMinutes(
      now.getMinutes() + config.lessonReservations.freeEditExpiryMinutes
    );
    const freeEditExpiryDate = now.toISOString();

    const reservationData = {
      ...data,
      userId: user.id,
      username: user.username,
      duration: (new Date(data.endUtc) - new Date(data.startUtc)) / 1000 / 60,
      freeEditExpiryDate,
    };

    return reservationData;
  }

  async getReservationById({ id }) {
    return await findRecordByPk({ model: LessonReservation, id: id });
  }

  async getUserPlanInfo({ userId }) {
    return await findRecordByFk({ model: PlanInfo, id: userId });
  }

  async updateCancelledReservationsCount({ userId }) {
    const planInfo = await this.getUserPlanInfo({ userId });
    const canceledLessonCount = planInfo.canceledLessonCount + 1;
    return await updateRecord({
      model: PlanInfo,
      updateData: { canceledLessonCount },
      id: userId,
    });
  }

  async updateRescheduledReservationsCount(user_id) {
    const planInfo = await this.getUserPlanInfo(user_id);
    const rescheduled_lesson_count = planInfo.rescheduled_lesson_count + 1;
    return await updateRecord(PlanInfo, { rescheduled_lesson_count }, user_id);
  }

  async rescheduleReservation(updateData, reservation_id) {
    return await updateRecord(LessonReservation, updateData, reservation_id);
  }

  async deleteReservation({ id }) {
    return await deleteRecord({ model: LessonReservation, id: id });
  }

  destructureReservationData({ data }) {
    return destructureData({ data, keys: ["startUtc", "endUtc"] });
  }
}

const lessonReservationsService = new LessonReservationsService();
module.exports = lessonReservationsService;
