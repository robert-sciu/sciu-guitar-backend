const userService = require("../controllers/users/userService");

async function attachUserSelectedWithId(req, res, next) {
  if (req.user.role === "admin" && req.id) {
    req.user = await userService.findUserById(req.id);
  } else {
    req.user = await userService.findUserById(req.user.id);
  }
  next();
}

module.exports = attachUserSelectedWithId;
