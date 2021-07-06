const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// User Model Calling
const User = require('../../models/User');

/**
 * @route   get api/users
 * @access  public
 */
router.post(
  '/',
  [
    /**
     * There use validator, validate user input in backend to protect database.
     */
    check('firstName', 'Please enter your correct first name').not().isEmpty(),
    check('lastName', 'Please enter your correct last name').not().isEmpty(),
    check('email', 'Please includes your email').isEmail(),
    check(
      'password',
      'Please enter a password with min 8 or more characters',
    ).isLength({
      min: 8,
      max: 32,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
      /**
       * Check if user already exist in database.
       */
      let user = await User.findOne({
        email,
      });
      if (user) {
        return res.status(409).json({
          errors: [
            {
              msg: 'User already exist.',
            },
          ],
        });
      }
      /**
       * Fetching Image from URL
       */
      let avatar = gravatar.url(email, {
        s: '200',
        d: 'mm',
        r: 'pg',
      });

      user = new User({
        firstName,
        lastName,
        email,
        avatar,
        password,
      });
      /**
       * end-to-end Password Encryption
       */
      let salt = await bcrypt.genSalt();

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      /**
       * fetching jsonwebtoken
       * @ this token will help to make protected routes
       */
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
          res.json({
            token,
          });
        },
      );
      // @todo remove this console
      // console.log(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
/**
 * router is a method. that's a callback function,
 * to call user's routes.
 *
 *
 */
