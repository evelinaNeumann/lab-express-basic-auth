const User = require("../models/User.model");

function authMiddleware(req, res, next) {
  if (req.session && req.session._id) {
    User.findById(req.session._id, (err, user) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new Error("User not found"));
      }

      req.currentUser = user;
      next();
    });
  } else {
    next();
  }
}

module.exports = authMiddleware;
