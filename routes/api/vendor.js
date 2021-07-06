const express = require('express');
const router = express.Router();
const middleware = require('../middleware/auth');
const Vendor = require('../../models/Vendor');
const { check, validationResult } = require('express-validator');

/**
 * @description     Post a Vendor
 * @route           post api/vendor/
 * @access          private
 *
 * */
router.post(
  '/',
  middleware,
  [
    check('slug', 'invalid credentials').notEmpty().isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { slug } = req.body;
    try {
      let vendor = await Vendor.findOne({
        slug,
      });
      if (vendor) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Slug already exist.',
            },
          ],
        });
      }
      vendor = new Vendor({
        slug,
      });
      await vendor.save();

      res.status(200).json({
        vendor,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

/**
 * @description     Get All Vendor Data
 * @route           Get api/vendor/get-all
 * @access          public
 */
router.get('/get-all', async (req, res) => {
  try {
    const allVendor = await Vendor.find();
    res.status(200).json({
      allVendor
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Get All Vendor Data by id
 * @route           Get api/vendor/get-all/:id
 * @access          public
 */

router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById({
      _id: req.params.id,
    });
    res.status(200).json({
      vendor,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Update Vendor Data by id
 * @route           Update api/vendor/:id
 * @access          private
 */
router.post(
  '/:id',
  middleware,
  [
    check('slug', 'invalid credentials').not().isEmpty().isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { slug } = req.body;
    try {
      await Vendor.findByIdAndUpdate({ _id: req.params.id }, { slug });
      res.status(200).json({
        msg: 'Update Successfully',
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

/**
 * @description     Delete Vendor Data by id
 * @route           Delete api/vendor/:id
 * @access          private
 */
router.delete('/:id', middleware, async (req, res) => {
  try {
    await Vendor.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      msg: 'Delete Successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
