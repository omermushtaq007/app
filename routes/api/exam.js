const express = require('express');
const router = express.Router();

const middleware = require('../middleware/auth');
const Exam = require('../../models/Exam');

const { check, validationResult } = require('express-validator');

// router.get('/', (req,res) => res.send('exam works'));
/**
 * @description     Post a exam
 * @route           post api/exam
 * @access          private
 *
 * */
router.post(
  '/',
  [
    middleware,
    check('slug', 'This is requires field').notEmpty(),
    check('certificateName', 'This is required field.').notEmpty(),
    check('examCode', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('examName', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('question', 'This is required field.').notEmpty(),
    check('price', 'This is required field.').notEmpty().isLength({ min: 1 }),
    check('status', 'This is required field.').notEmpty(),
    check('isRetired', 'This is required field.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      slug,
      certificateName,
      examCode,
      examName,
      question,
      price,
      status,
      isRetired,
      update,
    } = req.body;
    try {
      const data = await Exam.findOne({
        examCode,
        examName,
      });
      if (data) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Certificate already exist.',
            },
          ],
        });
      }
      const examData = new Exam({
        slug,
        certificateName,
        examCode,
        examName,
        question,
        price,
        status,
        isRetired,
        update,
      });
      // console.log(examData);
      await examData.save();
      res.status(200).json({
        examData,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
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
    let examData = await Exam.find();
    console.log(examData);
    res.json({ examData });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Delete exams
 * @route           Delete api/exams/
 * @access          private
 *
 */

router.delete('/:id', middleware, async (req, res) => {
  try {
    await Exam.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({
      msg: 'Delete Successfully',
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Get Exam by id
 * @route           Get api/exams/
 * @access          private
 *
 */
router.get('/:id', async (req, res) => {
  try {
    const examData = await Exam.findOne({ _id: req.params.id });
    res.status(200).json({
      examData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @description     Post exams by exam id
 * @route           Post api/exams/
 * @access          public
 *
 */
router.post(
  '/:id',
  [
    middleware,
    check('slug', 'This is requires field').notEmpty(),
    check('certificateName', 'This is required field.').notEmpty(),
    check('examCode', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('examName', 'This is required field.')
      .notEmpty()
      .isLength({ min: 3 }),
    check('question', 'This is required field.').notEmpty(),
    check('price', 'This is required field.').notEmpty().isLength({ min: 1 }),
    check('status', 'This is required field.').notEmpty(),
    check('isRetired', 'This is required field.').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const {
      slug,
      certificateName,
      examCode,
      examName,
      question,
      price,
      status,
      isRetired,
      update,
    } = req.body;
    try {
      await Exam.findByIdAndUpdate(
        { _id: req.params.id },
        {
          slug,
          certificateName,
          examCode,
          examName,
          question,
          price,
          status,
          isRetired,
          update,
        },
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
