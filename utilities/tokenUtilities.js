const jwt = require("jsonwebtoken");
const tokensExpiration =
  require("../config/config")[process.env.NODE_ENV].tokensExpiration;
// function getTokenExpiryMinutesVer(minutes) {
//   const now = new Date();
//   now.setMinutes(now.getMinutes() + minutes);
//   return now;
// }
// function getTokenExpiryDaysVer(days) {
//   const now = new Date();
//   now.setDate(now.getDate() + days);
//   return now;
// }

//////////////////////////////////////////////////////////////////////
///// AUTHORIZATION TOKENS  //////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function generateLoginJWT(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: tokensExpiration.loginToken,
    }
  );
}

function generateRefreshJWT(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: tokensExpiration.refreshToken,
    }
  );
}

function verifyRefreshJWT(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

//////////////////////////////////////////////////////////////////////
///// VERIFICATION TOKENS  ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function generateUserVerificationToken(userId) {
  const secret = process.env.JWT_VERIFICATION_SECRET;
  const id = userId;
  return jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: tokensExpiration.userVerificationToken,
    }
  );
}

function verifyVerificationToken(token) {
  const secret = process.env.JWT_VERIFICATION_SECRET;
  return jwt.verify(token, secret);
}

//////////////////////////////////////////////////////////////////////
///// ACTIVATION TOKENS  /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function generateUserActivationToken(userId) {
  const secret = process.env.JWT_USER_ACTIVATION_SECRET;
  const id = userId;
  return jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: tokensExpiration.userActivationToken,
    }
  );
}

function verifyUserActivationToken(token) {
  const secret = process.env.JWT_USER_ACTIVATION_SECRET;
  return jwt.verify(token, secret);
}

//////////////////////////////////////////////////////////////////////

module.exports = {
  generateLoginJWT,
  generateRefreshJWT,
  verifyRefreshJWT,
  generateUserVerificationToken,
  verifyVerificationToken,
  generateUserActivationToken,
  verifyUserActivationToken,
  // getTokenExpiryMinutesVer,
  // getTokenExpiryDaysVer,
};
