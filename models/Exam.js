const mongoose = require('mongoose');

const examScheme = new mongoose.Schema({
  slug: {
    type: String,
    require: true,
  },
  certificateName: {
    type: String,
    require: true,
  },
  examCode: {
    type: String,
    require: true,
  },
  examName: {
    type: String,
    require: true,
  },
  question: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isRetired: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Exam = mongoose.model('exams', examScheme);
