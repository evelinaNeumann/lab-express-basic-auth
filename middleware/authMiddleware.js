const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session && req.session.currentUser) {
    res.redirect('/user-profile');
  } else {
    next();
  }
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
