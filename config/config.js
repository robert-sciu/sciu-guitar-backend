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
  s3Paths: {
    taskFilesPath: "tasks",
    dektopQualityImgPath: "page-images/desktop",
    mobileQualityImgPath: "page-images/mobile",
    lazyQualityImgPath: "page-images/lazy",
  },
  imageCompressionParams: {
    large: {
      desktop: { width: 1000, fit: "inside" },
      mobile: { width: 500, fit: "inside" },
      lazy: { width: 10, fit: "inside" },
    },
    medium: {
      deskotp: { width: 500, fit: "inside" },
      mobile: { width: 250, fit: "inside" },
      lazy: { width: 10, fit: "inside" },
    },
    small: {
      desktop: { width: 250, fit: "inside" },
      mobile: { width: 125, fit: "inside" },
      lazy: { width: 10, fit: "inside" },
    },
  },
  imageCompressionParamsMappingsForRole: {
    hero: "large",
    bio: "medium",
    about: "medium",
    contact: "medium",
  },
  pageTextRoles: ["hero", "bio"],
  youTubeVideosRoles: ["students", "demo"],
};

module.exports = {
  production: { ...commonConfig },
  development: { ...commonConfig },
  test: {
    ...commonConfig,
    user: {
      id: 1,
      username: "robert",
      email: "gitara.rs@gmail.com",
      role: "user",
      isVerified: true,
      isActive: true,
      difficultyClearanceLevel: 44,
      minimumTaskLevelToDisplay: 1,
      notes: null,
    },
    adminUser: {
      id: 1,
      username: "admin",
      email: "robert.sciu@gmail.com",
      role: "admin",
      isVerified: true,
      isActive: true,
      difficultyClearanceLevel: 999,
      minimumTaskLevelToDisplay: 1,
      notes: null,
    },
  },
};
