const express = require('express');
const router = express.Router();

const middleware = require('../middleware/auth');
const Certificate = require('../../models/Certificate');

const { check, validationResult } = require('express-validator');

/**
 * @description     Post a Certificate
 * @route           post api/certificate/
 * @access          private
 *
 * */
router.post(
  '/',
  [
    middleware,
    check('certificateName', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('status', 'This is required field.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { slug, certificateName, status } = req.body;

    try {
      let certification = await Certificate.findOne({
        certificateName,
      });
      if (certification) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Certificate already exist.',
            },
          ],
        });
      }

      const certificate = new Certificate({
        slug,
        certificateName,
        status,
      });
      await certificate.save();
      res.status(200).json({
        certificate,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error').sendDate;
    }
  },
);

/**
 * @description     Get All Certificates List
 * @route           Get api/certificate/
 * @access          public
 *
 * */
router.get('/', async (req, res) => {
  try {
    let certification = await Certificate.find();
    res.json({ certification });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Delete certificate
 * @route           Get api/certificate/
 * @access          private
 *
 */
router.delete('/:id', middleware, async (req, res) => {
  try {
    await Certificate.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      msg: 'Delete Successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Get Certificate by certificate id 
 * @route           Get api/certificate/
 * @access          public
 *
 */
router.get('/:id', async (req, res) => {
  try {
    const certificateData = await Certificate.findOne({ _id: req.params.id });
    res.status(200).json({
      certificateData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Post Certificate by certificate id 
 * @route           Post api/certificate/
 * @access          public
 *
 */
router.post(
  '/:id',
  [
    middleware,
    check('certificateName', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('status', 'This is required field.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { slug, certificateName, status } = req.body;
    try {
      await Certificate.findByIdAndUpdate(
        { _id: req.params.id },
        { slug, certificateName, status },
      );

      res.status(200).json({
        msg: 'Update Successfully',
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
