const {
  findRecordByPk,
  updateRecord,
  findRecordByValue,
  findAllRecords,
  deleteRecord,
  createRecord,
} = require("../../utilities/sequelizeUtilities");

const { sendMail } = require("../../utilities/mailer");
const { userCache } = require("../../utilities/nodeCache");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const {
  generateUserVerificationToken,
  verifyVerificationToken,
  generateUserActivationToken,
  verifyUserActivationToken,
} = require("../../utilities/tokenUtilities");
const mailMessages = require("../../config/mailsData");
const { destructureData } = require("../../utilities/serviceUtilities");

const tokensExpiry = require("../../config/config")[process.env.NODE_ENV]
  .tokensExpiration;

const { User, PlanInfo, UserToken, LessonReservation, UserTask } =
  require("../../models").sequelize.models;

class UserService {
  /////////////////////////////////////////////////////////////////////////////////
  // utilities /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  clearUserCache({ userId }) {
    userCache.del(userId);
  }

  checkIfAdminCreationIsAllowed({ userData }) {
    if (userData.role !== "admin") return false;
    const isAdminCreationEnabled =
      process.env.CREATE_ADMIN_USER_ENABLED === "true";
    if (!isAdminCreationEnabled) return false;
    if (userData.token !== process.env.CREATE_ADMIN_TOKEN) return false;
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////
  //crypto ////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  generateResetToken() {
    const resetToken = crypto.randomInt(1000000, 9999999);
    const resetTokenExpiry = Date.now() + 60 * 15 * 1000;
    return { resetToken, resetTokenExpiry };
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  /////////////////////////////////////////////////////////////////////////////////
  // user tokens //////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  async generateAndSaveUserActivationToken({ userId }) {
    const activationToken = generateUserActivationToken(userId);
    await createRecord(UserToken, {
      token: activationToken,
      userId: userId,
      type: "activation",
      expiresAt: Date.now() + tokensExpiry.userActivationTokenMs,
    });
    return activationToken;
  }

  async generateAndSaveUserVerificationToken({ userId, transaction }) {
    const verificationToken = generateUserVerificationToken(userId);
    await createRecord({
      model: UserToken,
      data: {
        token: verificationToken,
        userId: userId,
        type: "verification",
        expiresAt: Date.now() + tokensExpiry.userVerificationTokenMs,
      },
      transaction,
    });
    return verificationToken;
  }

  verifyUserVerificationToken({ token }) {
    return verifyVerificationToken(token);
  }

  verifyUserActivationToken({ token }) {
    return verifyUserActivationToken(token);
  }

  async isVerificationTokenValid({ token, userId }) {
    const verificationToken = await UserToken.findOne({
      where: {
        token,
        userId: userId,
        type: "verification",
      },
    });
    if (verificationToken?.dataValues?.token !== token) {
      return false;
    }
    return true;
  }

  async isActivationTokenValid(token, userId) {
    const activationToken = await UserToken.findOne({
      where: {
        token,
        userId: userId,
        type: "activation",
      },
    });
    if (activationToken?.dataValues?.token !== token) {
      return false;
    }
    return true;
  }

  /////////////////////////////////////////////////////////////////////////////////
  // Database functions ///////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  async createUser({ data, isAdmin, transaction }) {
    const userObject = {
      ...data,
      password: await this.hashPassword(data.password),
      role: isAdmin ? "admin" : "user",
      difficultyClearanceLevel: isAdmin ? 999 : 1,
      isActive: isAdmin ? true : false,
      isVerified: isAdmin ? true : false,
    };
    return await createRecord({ model: User, data: userObject, transaction });
  }

  async updateUserVerificationStatus({ userId }) {
    return await updateRecord({
      model: User,
      updateData: { isVerified: true },
      id: userId,
    });
  }

  async updateUserActivationStatus({ userId }) {
    return await updateRecord({
      model: User,
      updateData: { isActive: true },
      id: userId,
    });
  }

  async deleteUserToken({ token, userId, type }) {
    return await UserToken.destroy({
      where: { token, userId, type },
    });
  }

  async deleteAllTokensForUser({ userId, transaction }) {
    await UserToken.destroy({
      where: { userId },
      transaction,
    });
  }

  async deleteUserTasks(user_id, transaction) {
    await UserTask.destroy({
      where: { user_id: user_id },
      transaction,
    });
  }

  async deleteUserReservations(userId, transaction) {
    await LessonReservation.destroy({
      where: { userId },
      transaction,
    });
  }

  async createPlanInfo({ userId, transaction }) {
    return await createRecord({
      model: PlanInfo,
      data: { userId },
      transaction,
    });
  }

  async getResetPasswordToken(email) {
    const user = await findRecordByValue(User, { email });
    if (!user) {
      return null;
    }
    return { resetPasswordToken: user.reset_password_token, userId: user.id };
  }

  async getAllUsers() {
    const users = await findAllRecords({ model: User });
    if (!users) {
      return null;
    }
    const sanitizedUsers = users.map((user) =>
      this.sanitizeUserData({ data: user })
    );
    return sanitizedUsers;
  }

  async saveResetPasswordToken(user_id, resetToken, resetTokenExpiry) {
    return await updateRecord(
      User,
      {
        reset_password_token: resetToken,
        reset_password_token_expiry: resetTokenExpiry,
      },
      user_id
    );
  }

  async findUserById({ userId, transaction }) {
    const user = await findRecordByPk({ model: User, id: userId, transaction });
    return this.sanitizeUserData(user);
  }

  async findUserByEmail({ email, transaction }) {
    const user = await findRecordByValue({
      model: User,
      value: { email },
      transaction,
    });
    if (!user) {
      return null;
    }
    return this.sanitizeUserData({ data: user });
  }

  async deleteUser({ userId, transaction }) {
    return await deleteRecord({ model: User, id: userId, transaction });
  }

  async deletePlanInfo({ userId, transaction }) {
    return await deleteRecord({ model: PlanInfo, id: userId, transaction });
  }

  async findUserEmail(user_id) {
    const user = await findRecordByPk(User, user_id);
    if (!user) {
      return undefined;
    }
    return user.email;
  }

  async getSavedChangeEmailTokenAndNewEmail(user_id) {
    const user = await findRecordByPk(User, user_id);
    return this.destructureTokenAndNewEmail(user);
  }

  async updateUser({ userId, data }) {
    return await updateRecord({ model: User, updateData: data, id: userId });
  }

  async updateUserPassword(user_id, password) {
    return await updateRecord(
      User,
      {
        password,
      },
      user_id
    );
  }

  async emailIsInDatabase(email) {
    const existingEmail = await findRecordByValue(User, { email });
    if (existingEmail) {
      return true;
    }
    return false;
  }

  /////////////////////////////////////////////////////////////////////////////////
  // Email functions //////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  async sendEmailsConcerningNewUser({
    userEmail,
    username,
    verificationToken,
    language,
  }) {
    const verificationLink = `${
      process.env.Node_ENV === "production"
        ? process.env.PRODUCTION_SERVER_ADDRESS
        : process.env.DEV_SERVER_ADDRESS
    }/verifyUser?token=${verificationToken}`;

    const error = await sendMail({
      email: userEmail,
      subject: mailMessages.subjects.verificationEmail[language],
      text: `${mailMessages.content.clickVerificationLink[language]}: ${verificationLink}`,
    });

    await sendMail({
      email: process.env.MY_EMAIL,
      subject: `Nowy użytkownik: ${username}, (${new Date().toLocaleString(
        "pl-PL"
      )})`,
      text: `Nowy użytkownik właśnie się zarejestrował.\nImię: ${username}\nAdres email: ${userEmail}\n${
        error ? `Błąd: wystąpił błąd, zweryfikuj użytkownika ręcznie.` : ""
      }`,
    });
  }

  async sendMailToMyselfAboutUserVerification({ userId, activationToken }) {
    const user = await this.findUserById({ userId });

    const activationLink = `${
      process.env.Node_ENV === "production"
        ? process.env.PRODUCTION_SERVER_ADDRESS
        : process.env.DEV_SERVER_ADDRESS
    }/activateUser?token=${activationToken}`;

    await sendMail({
      email: process.env.MY_EMAIL,
      subject: `Weryfikacja użytkownika: ${
        user.username
      }, (${new Date().toLocaleString("pl-PL")})`,
      text: `Nowy użytkownik właźnie się zweryfikował.\nImię: ${user.username}\nAdres email: ${user.email}\nLink aktywacyjny: ${activationLink}`,
    });
  }

  async sendEmailResetEmail(email, resetToken, language) {
    if (language === "pl") {
      return await sendMail({
        email,
        subject: "Zmiana adresu Email",
        text: `Twoj kod bezpieczeństwa: ${resetToken}`,
      });
    } else if (language === "en") {
      return await sendMail({
        email,
        subject: "Change Email Address",
        text: `Your reset token is: ${resetToken}`,
      });
    } else {
      return new Error();
    }
  }

  async sendPasswordResetEmail(email, resetToken, language) {
    if (language === "pl") {
      return await sendMail({
        email,
        subject: "Zmiana hasła",
        text: `Twoj kod bezpieczeństwa: ${resetToken}`,
      });
    } else if (language === "en") {
      return await sendMail({
        email,
        subject: "Change Password",
        text: `Your reset token is: ${resetToken}`,
      });
    } else {
      return new Error();
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  // Destructuring functions //////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  // Destructure functions for different user data objects
  sanitizeUserData({ data }) {
    return destructureData({
      data,
      keys: [
        "id",
        "username",
        "email",
        "difficultyClearanceLevel",
        "isActive",
        "isVerified",
        "role",
        "minimumTaskLevelToDisplay",
        "notes",
      ],
    });
  }
  destructureCreateUserData({ data }) {
    return destructureData({
      data,
      keys: ["username", "email", "password", "role", "token"],
    });
  }

  destructureUserVerificationData({ data }) {
    return destructureData({
      data,
      keys: ["token"],
    });
  }

  destructureUserActivationData({ data }) {
    return destructureData({
      data,
      keys: ["token"],
    });
  }
  destructureUpdateUserData({ data, isAdmin }) {
    const adminKeys = [
      "difficultyClearanceLevel",
      "isVerified",
      "isActive",
      "notes",
    ];
    const userKeys = ["username", "minimumTaskLevelToDisplay"];
    return destructureData({
      data,
      keys: isAdmin ? adminKeys : userKeys,
    });
  }

  destructurePasswordResetData(data) {
    return destructureData({
      data,
      keys: ["email", "password", "reset_password_token"],
    });
  }
}

const userService = new UserService();
module.exports = userService;
