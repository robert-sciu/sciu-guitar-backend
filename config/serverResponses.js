const config = require("../config/config")[process.env.NODE_ENV];

module.exports = {
  common: {},

  errors: {
    serverError: {
      pl: "Wystąpił błąd serwera",
      en: "Server error",
    },

    authentication: {
      wrongCredentials: {
        pl: "Nieprawidłowy login lub hasło",
        en: "Wrong login or password",
      },
      missingToken: {
        pl: "Brak tokenu",
        en: "Missing token",
      },
      invalidToken: {
        pl: "Nieprawidłowy token",
        en: "Invalid token",
      },
      tokenExExpired: {
        pl: "Token wygasł",
        en: "Token expired",
      },
    },

    user: {
      userNotFound: {
        pl: "Użytkownik nie istnieje",
        en: "User does not exist",
      },
      userNotVerified: {
        pl: "Musisz najpierw zweryfikować swój email, sprawdź skrzynkę pocztową",
        en: "You must verify your email first, check your mailbox",
      },
      userNotActivated: {
        pl: "Użytkownik nie jest jeszcze aktywowany, czekaj na aktywację",
        en: "User is not activated yet, wait for activation",
      },
      mailAlreadyExists: {
        pl: "Użytkownik o podanym adresie email już istnieje",
        en: "User with given email already exists",
      },
      adminCreationNotAllowed: {
        pl: "Nie można utworzyć użytkownika o roli admin",
        en: "Admin user creation is not allowed",
      },
      UserActivated: {
        pl: "Użytkownik został aktywowany",
        en: "User activated",
      },
    },

    lessonReservation: {
      reservationNotFound: {
        pl: "Rezerwacja nie istnieje",
        en: "Reservation does not exist",
      },
      notYourReservation: {
        pl: "To nie jest twoja rezerwacja",
        en: "This is not your reservation",
      },
      rescheduleTooFar: {
        pl: `Nie można zmienić terminu o więcej niż ${config.lessonReservations.maxRescheduleDaysFromReservationCreation} dni`,
        en: `Cannot change date by more than ${config.lessonReservations.maxRescheduleDaysFromReservationCreation} days`,
      },
    },

    tag: {
      tagNotFound: {
        pl: "Tag nie istnieje",
        en: "Tag does not exist",
      },
      tagAlreadyExists: {
        pl: "Tag o podanej nazwie już istnieje",
        en: "Tag with given name already exists",
      },
    },
  },

  messages: {
    updateSuccess: {
      pl: "Zaktualizowano pomyślnie",
      en: "Updated successfully",
    },

    authentication: {
      logoutSuccessful: {
        pl: "Wylogowano pomyślnie",
        en: "Logout successful",
      },
    },
    user: {
      userCreated: {
        pl: "Użytkownik został utworzony",
        en: "User created",
      },
      userDeleted: {
        pl: "Użytkownik został usunięty",
        en: "User deleted",
      },
    },
    lessonReservation: {
      reservationDeleted: {
        pl: "Rezerwacja została usunięta",
        en: "Reservation deleted",
      },
      reservationUpdated: {
        pl: "Rezerwacja została zaktualizowana",
        en: "Reservation successfully updated",
      },
    },
    pricing: {
      pricingUpdated: {
        pl: "Cennik został zaktualizowany",
        en: "Pricing updated",
      },
    },
    tag: {
      tagCreated: {
        pl: "Tag został utworzony",
        en: "Tag created",
      },
      tagUpdated: {
        pl: "Tag został zaktualizowany",
        en: "Tag updated",
      },
      tagDeleted: {
        pl: "Tag został usunięty",
        en: "Tag deleted",
      },
    },
  },

  statusCodes: {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    internalServerError: 500,
  },
};
