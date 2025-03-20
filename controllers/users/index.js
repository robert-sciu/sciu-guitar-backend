const getUser = require("./getUser");
const createUser = require("./createUser");
const createAdmin = require("./createAdmin");
const verifyUser = require("./verifyUser");
const activateUser = require("./activateUser");
const updateUser = require("./updateUser");
const resetPasswordRequest = require("./resetPasswordRequest");
const resetPassword = require("./resetPassword");
const getUsersAdmin = require("./admin/getUsersAdmin");
const updateUserAdmin = require("./admin/updateUserAdmin");
const deleteUserAdmin = require("./admin/deleteUserAdmin");

module.exports = {
  getUser,
  createUser,
  createAdmin,
  verifyUser,
  activateUser,
  updateUser,
  resetPasswordRequest,
  resetPassword,
  getUsersAdmin,
  updateUserAdmin,
  deleteUserAdmin,
};
