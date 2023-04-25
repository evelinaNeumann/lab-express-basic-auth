const { Router } = require("express");
const router = new Router();
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require("../middleware/authMiddleware");
const user = require("../models/User.model");

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    res.render("auth/signup", {
      errorMessage: "Passwords don't match",
    });
    return;
  }

  user.create({
    username: req.body.username,
    passwordHash: bcryptjs.hashSync(req.body.password, saltRounds),
    email: req.body.email,
  })
    .then((user) => {
      res.redirect("/auth/login");
    })
    .catch((err) => {
      res.render("auth/signup", {
        errorMessage: err,
      });
    });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  user.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Your credentials are wrong",
        });
        return;
      }
      if (bcryptjs.compareSync(password, user.passwordHash)) {
        res.render('users/user-profile', { user });
      } else {
        res.render("auth/login", {
          errorMessage: "Your credentials are wrong",
        });
      }
    })
    .catch((err) => {
      res.render("auth/login", {
        errorMessage: err,
      });
    });
  console.log(req.session);
});

 
router.get("/userProfile", (req, res) => res.render("users/user-profile"));

module.exports = router;
