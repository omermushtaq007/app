const mongoose = require('mongoose');
const config = require('config');
const db = config.get('realExamHubURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Database Connected')
  } catch (err) {
    console.error(err.message);
    /**
     * At this Point process will be exit with error message
     * 
     */
    process.exit(1)
  }
}

module.exports = connectDB;
/**
 * connectDB is a method. that's a callback function,
 * to call database.
 * 
 */
