function detectLanguage(req, res, next) {
  const language = req.headers["accept-language"];
  if (language === "pl") {
    req.language = "pl";
    return next();
  } else {
    req.language = "en";
    return next();
  }
}

module.exports = { detectLanguage };
