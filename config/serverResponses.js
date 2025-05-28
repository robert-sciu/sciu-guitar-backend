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
      // missingToken: {
      //   pl: "Brak tokenu",
      //   en: "Missing token",
      // },
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
    task: {
      taskAlreadyExists: {
        pl: "Zadanie o podanym tytule już istnieje",
        en: "Task with given title already exists",
      },
      taskNotFound: {
        pl: "Zadanie nie istnieje",
        en: "Task does not exist",
      },
    },
    userTasks: {
      userTaskAlreadyExists: {
        pl: "Zadanie już istnieje",
        en: "User task already exists",
      },
      userTaskNotFound: {
        pl: "Zadanie nie istnieje",
        en: "User task does not exist",
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
    taskTag: {
      taskTagAlreadyExists: {
        pl: "Połączenie tag-zadanie już istnieje",
        en: "Task tag already exists",
      },
    },
    pageImages: {
      pageImageNotFound: {
        pl: "Obraz nie istnieje",
        en: "Image does not exist",
      },
      pageImageAlreadyExists: {
        pl: "Obraz o podanej nazwie już istnieje",
        en: "Image with given name already exists",
      },
      compressionConfigNotFound: {
        pl: "Nie znaleziono konfiguracji kompresji",
        en: "Compression config not found",
      },
    },
    pageTexts: {
      invalidRole: {
        pl: "Nieprawidłowa kategoria tekstu",
        en: "Invalid text role",
      },
    },
    youTubeVideos: {
      youTubeVideoAlreadyExists: {
        pl: "Video o podanym tytule lub url już istnieje",
        en: "Video with given title or url already exists",
      },
      roleNotAllowed: {
        pl: "Nieprawidłowa kategoria dla tego filmu",
        en: "Invalid role for this video",
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
    task: {
      taskCreated: {
        pl: "Zadanie zostało utworzone",
        en: "Task created successfully",
      },
      taskUpdated: {
        pl: "Zadanie zostało zaktualizowane",
        en: "Task updated",
      },
      taskDeleted: {
        pl: "Zadanie zostało usunięte",
        en: "Task deleted",
      },
    },
    userTasks: {
      userTasksCreated: {
        pl: "Zadania użytkownika zostały utworzone",
        en: "User tasks created",
      },
      userTasksUpdated: {
        pl: "Zadania użytkownika zostały zaktualizowane",
        en: "User tasks updated",
      },
      userTasksDeleted: {
        pl: "Zadania użytkownika zostały usunięte",
        en: "User tasks deleted",
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
    taskTag: {
      taskTagCreated: {
        pl: "Zadanie zostało przypisane do tagu",
        en: "Task assigned to tag",
      },
      taskTagDeleted: {
        pl: "Zadanie zostało usunięte z tagu",
        en: "Task removed from tag",
      },
    },
    pageImage: {
      pageImageCreated: {
        pl: "Obraz został utworzony",
        en: "Image created",
      },
      pageImageDeleted: {
        pl: "Obraz został usunięty",
        en: "Image deleted",
      },
    },
    pageTexts: {
      pageTextsUpdated: {
        pl: "Teksty zostały zaktualizowane",
        en: "Page texts updated",
      },
    },
    youTubeVideos: {
      youTubeVideoCreated: {
        pl: "Link został utworzony",
        en: "YouTube link created",
      },
      youTubeVideoDeleted: {
        pl: "Link został usunięty",
        en: "YouTube link deleted",
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
