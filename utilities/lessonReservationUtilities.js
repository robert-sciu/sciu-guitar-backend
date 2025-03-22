const { Op } = require("sequelize");
const { LessonReservation } = require("../models");
const fs = require("fs");
const path = require("path");
const workHoursFilePath = path.join(__dirname, "../config/workHours.json");

function checkIfReservationDateIsAllowed({ reservationData }) {
  const today = new Date().toISOString().split("T")[0];
  const reservationStartDate = reservationData.startUtc.split("T")[0];

  if (reservationStartDate < today) {
    const errorMsg = {
      pl: "Data rezerwacji nie może być w przeszłości",
      en: "Reservation date cannot be in the past",
    };
    throw new Error(JSON.stringify(errorMsg));
  }

  if (reservationStartDate === today) {
    const errorMsg = {
      pl: "Data rezerwacji nie może być dzisiaj",
      en: "Reservation date cannot be today",
    };
    throw new Error(JSON.stringify(errorMsg));
  }

  if (
    //prettier-ignore
    (new Date(reservationStartDate) - new Date(today)) / (24 * 60 * 60 * 1000) >= 14
  ) {
    const errorMsg = {
      pl: "Data rezerwacji nie może być dalej jak 14 dni w przyszłości",
      en: "Reservation date cannot be more than 14 days in the future",
    };
    throw new Error(JSON.stringify(errorMsg));
  }
  // if date is valid then we check time

  const duration = reservationData.duration;
  if (duration < 60 || duration > 120) {
    const errorMsg = {
      pl: "Lekcja musi trwać od 60 do 120 minut",
      en: "Lesson must be between 60 and 120 minutes",
    };
    throw new Error(JSON.stringify(errorMsg));
  }

  const workHours = JSON.parse(fs.readFileSync(workHoursFilePath, "utf8"));

  const startHourUTC = workHours.startHourUTC;
  const endHourUTC = workHours.endHourUTC;

  const reservationStartHour = reservationData.startUtc
    .split("T")[1]
    .split(".")[0];
  const reservationEndHour = reservationData.endUtc.split("T")[1].split(".")[0];

  if (reservationStartHour > reservationEndHour) {
    const errorMsg = {
      pl: "Początkowy czas rezerwacji musi być mniejszy od koncowego czasu rezerwacji",
      en: "Start time of reservation must be less than end time of reservation",
    };
    throw new Error(JSON.stringify(errorMsg));
  }
  if (reservationStartHour < startHourUTC || reservationEndHour > endHourUTC) {
    const errorMsg = {
      pl: "Czas rezerwacji musi zawierać się w dostępnych godzinach",
      en: "Reservation time is not within the allowed time frame",
    };
    throw new Error(JSON.stringify(errorMsg));
  }

  return;
}

async function checkForOverlapingReservations({ reservationData }) {
  let overlap;
  const { startUtc, endUtc } = reservationData;
  const overlappingReservations = await LessonReservation.findAll({
    where: {
      [Op.and]: {
        startUtc: {
          [Op.lt]: endUtc,
        },
        endUtc: {
          [Op.gt]: startUtc,
        },
        id: {
          [Op.ne]: reservationData?.id || null,
        },
      },
    },
  });

  if (overlappingReservations.length > 0) {
    overlap = overlappingReservations.map((reservation) => {
      const errorMsg = {
        pl: `Konflikt z rezerwacją dokonaną przez ${
          reservation.userId === reservationData.userId
            ? "Ciebie"
            : reservation.username
        }`,
        en: `Conflict with reservation made by ${
          reservation.userId === reservationData.userId
            ? "you"
            : reservation.username
        }`,
      };
      throw new Error(JSON.stringify(errorMsg));
    });
  }
  return;
}

module.exports = {
  checkIfReservationDateIsAllowed,
  checkForOverlapingReservations,
};
