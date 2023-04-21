const express = require('express');
const router = express.Router();

// Require necessary isLoggedIn middleware in order to control access to specific routes
//const isLoggedIn = require("../middleware/isLoggedIn");

// GET homepage
router.get('/', (req, res, next) => {
  res.render('home', { title: 'Home' });
});

// GET login page
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

// POST login form
router.post('/login', (req, res, next) => {
  // Handle form submission and authentication
  // Redirect to user's profile page after successful login
});

// GET signup page
router.get('/signup', (req, res, next) => {
  res.render('auth/signup', { errorMessage: '' });
});

// POST signup form
router.post('/signup', (req, res, next) => {
  // Handle form submission and create new user in database
  // Redirect to login page after successful registration
});

module.exports = router;
