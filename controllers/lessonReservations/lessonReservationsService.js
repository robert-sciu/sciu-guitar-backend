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
  updateRecord,
  deleteRecord,
  createRecord,
  findAllRecords,
  findRecordByValue,
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

  createReservationUpdateData({ reservation, updateData, isAdmin }) {
    const freeEdit = reservation.freeEditExpiryDate > new Date();

    const reservationUpdateData = {
      id: reservation.id,
      userId: reservation.userId,
      username: reservation.username,
      startUtc: reservation.startUtc,
      endUtc: reservation.endUtc,
      ...updateData,
      //prettier-ignore
      duration: (new Date(updateData.endUtc) - new Date(updateData.startUtc)) / 1000 / 60,
      rescheduledByUser: !isAdmin && !freeEdit,
      rescheduledByAdmin: isAdmin,
    };

    return reservationUpdateData;
  }

  isRescheduleTimeTooFar({ reservation, updateData }) {
    const reservationCreatedAt = new Date(reservation.createdAt);

    const maxRescheduleDate = new Date(
      reservationCreatedAt.setDate(
        reservationCreatedAt.getDate() +
          config.lessonReservations.maxRescheduleDaysFromReservationCreation
      )
    );

    const rescheduleDate = new Date(updateData.startUtc);

    return rescheduleDate > maxRescheduleDate;
  }

  async getReservationById({ id }) {
    return await findRecordByPk({ model: LessonReservation, id: id });
  }

  async getUserPlanInfo({ userId }) {
    return await findRecordByValue({ model: PlanInfo, id: { userId } });
  }

  async updateCancelledReservationsCount({ userId }) {
    const planInfo = await this.getUserPlanInfo({ userId });
    const canceledLessonCount = planInfo.canceledLessonCount + 1;
    return await updateRecord({
      model: PlanInfo,
      updateData: { canceledLessonCount },
      id: planInfo.id,
    });
  }

  async updateRescheduledReservationsCount({ userId }) {
    const planInfo = await this.getUserPlanInfo({ userId });
    const rescheduledLessonCount = planInfo.rescheduledLessonCount + 1;

    return await updateRecord({
      model: PlanInfo,
      updateData: { rescheduledLessonCount },
      id: planInfo.id,
    });
  }

  async updateReservation({ reservationUpdateData }) {
    return await updateRecord({
      model: LessonReservation,
      updateData,
      id: reservationUpdateData.id,
    });
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
