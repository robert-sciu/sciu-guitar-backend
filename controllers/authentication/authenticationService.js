const {
  findRecordByValue,
  createRecord,
  updateRecord,
} = require("../../utilities/sequelizeUtilities");
const { User, UserToken } = require("../../models").sequelize.models;
const bcrypt = require("bcryptjs");
const {
  generateLoginJWT,
  generateRefreshJWT,
  verifyRefreshJWT,
} = require("../../utilities/tokenUtilities");
const { destructureData } = require("../../utilities/serviceUtilities");
const tokensExpiration = require("../../config/config")[process.env.NODE_ENV]
  .tokensExpiration;

class AuthenticationService {
  // constructor() {}
  async findUserByEmail({ email }) {
    return await findRecordByValue({ model: User, value: { email } });
  }

  async findStoredToken({ token }) {
    return await findRecordByValue({
      model: UserToken,
      value: { token, revoked: false },
    });
  }

  async revokeToken({ token }) {
    const existingToken = await findRecordByValue({
      model: UserToken,
      value: {
        token,
        revoked: false,
      },
    });
    if (!existingToken) {
      return null;
    }
    return await updateRecord({
      model: UserToken,
      updateData: { revoked: true },
      id: existingToken.id,
    });
  }

  async verifyPassword({ hash, password }) {
    return await bcrypt.compare(password, hash);
  }

  async saveRefreshToken({ refreshToken, userId }) {
    return await createRecord({
      model: UserToken,
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + tokensExpiration.refreshTokenMs),
        type: "refresh",
        revoked: false,
      },
    });
  }

  attachCookies({ res, refreshToken }) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  clearCookies({ res }) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  getLoginJWT({ user }) {
    return generateLoginJWT(user);
  }

  getLoginJWTUsingRefreshJWT({ refreshToken }) {
    const decodedToken = verifyRefreshJWT(refreshToken);
    return generateLoginJWT(decodedToken);
  }

  getRefreshJWT({ user }) {
    return generateRefreshJWT(user);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////// destructuring //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  destrucureLoginCredentials({ data }) {
    return destructureData({
      data,
      keys: ["email", "password"],
    });
  }
}

const authenticationService = new AuthenticationService();

module.exports = authenticationService;
