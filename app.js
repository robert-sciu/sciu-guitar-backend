const createError = require("http-errors");
const express = require("express");
const router = require("./routes");

const path = require("path");

const {
  useCors,
  useSecureConnection,
  useHelmet,
  useCommonMiddleware,
  useRateLimit,
} = require("./middleware/commonMiddleware");
// const { sanitize } = require("./utilities/sanitization");

const app = express();

useHelmet(app);

useCommonMiddleware(app);

// app.use(sanitize);

app.use(express.static(path.join(__dirname, "public")));

useCors(app);
useSecureConnection(app);

useRateLimit(app);

router(app);

// dailyTask.start();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
