const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  slug: {
    type: String,
    require: true,
  },

  certificateName: {
    type: String,
    require: true,
  },

  status: {
    type: Boolean,
    require: true,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Certificate = mongoose.model('certificate', CertificateSchema);
module.exports = Certificate;
