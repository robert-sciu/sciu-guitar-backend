const getUser = require("./getUser");
const createUser = require("./createUser");
const verifyUser = require("./verifyUser");
const activateUser = require("./activateUser");
const updateUser = require("./updateUser");
const resetPasswordRequest = require("./resetPasswordRequest");
const resetPassword = require("./resetPassword");
const deleteUser = require("./deleteUser");
const changeEmailRequest = require("./changeEmailRequest");
const changeEmail = require("./changeEmail");
const getAllUsers = require("./getAllUsers");

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  verifyUser,
  activateUser,
  updateUser,
  resetPasswordRequest,
  resetPassword,
  deleteUser,
  changeEmailRequest,
  changeEmail,
};
