const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * GET  User Data
 * Public Route
 */
router.get('/', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select([
      '-password',
      '-isGuest',
    ]);
    res.json({
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error 1');
  }
});

/**
 * POST  User Login
 * Public Route
 */
router.post(
  '/',
  [
    /**
     * Check User Input Fields,
     * There use validator,
     * validate user input in backend to protect database.
     */
    check('email', 'invalid email').isEmail(),
    check('password', 'invalid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: 'Invalid Credentials',
      });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      /**
       * Check user existence
       */
      if (!user) {
        return res.status('400').json({
          msg: 'Invalid Credentials',
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status('400').json({
          msg: 'Invalid Credentials',
        });
      }

      const payLoad = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payLoad,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          return res
            .json({
              token,
            })
            .status(200);
        },
      );
      // console.dir(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

/**
 *
 */
router.get('/all', middleware, async (req, res) => {
  try {
    const allUsers = await User.find().select(['-password', '-isGuest', '-isAdmin', '-avatar']);
    res.json({ allUsers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
