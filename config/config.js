const commonConfig = {
  tokensExpiration: {
    loginToken: "30d",
    refreshToken: "30d",
    refreshTokenMs: 30 * 24 * 60 * 60 * 1000,
    userVerificationToken: "1d",
    userVerificationTokenMs: 24 * 60 * 60 * 1000,
    userActivationToken: "1d",
    userActivationTokenMs: 24 * 60 * 60 * 1000,
  },
  lessonReservations: {
    freeEditExpiryMinutes: 60,
    maxRescheduleDaysFromReservationCreation: 7,
  },
};

module.exports = {
  production: { ...commonConfig },
  development: { ...commonConfig },
  test: { ...commonConfig },
};
