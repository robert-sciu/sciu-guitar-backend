const jwt = require("jsonwebtoken");

const { handleErrorResponse } = require("../utilities/controllerUtilities");
const { User } = require("../models").sequelize.models;
const { userCache } = require("../utilities/nodeCache");
const logger = require("../utilities/logger");

async function authenticateJWT(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return handleErrorResponse(res, 401, "No token, authorization denied");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let userData = await userCache.get(decoded.id);
    if (!userData) {
      const user = await User.findOne({
        where: {
          id: decoded.id,
        },
      });

      const { password, new_email_temp, ...userDataValues } = user.dataValues;

      if (!userDataValues) {
        return handleErrorResponse(res, 404, "User not found");
      }

      if (userDataValues.isVerified === false) {
        return handleErrorResponse(res, 403, "User is not verified");
      }

      userData = userDataValues;
      userCache.set(decoded.id, userData);
    }
    req.user = userData;

    next();
  } catch (error) {
    logger.error(error);
    return handleErrorResponse(res, 401, "Token is not valid");
  }
}

function verifyUserIsAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return handleErrorResponse(res, 403, "Access denied");
  }
  next();
}

const authenticateAdminJWT = [authenticateJWT, verifyUserIsAdmin];

module.exports = { authenticateJWT, verifyUserIsAdmin, authenticateAdminJWT };
