const mongoose = require('mongoose');

const VendorScheme = new mongoose.Schema({
    // vendor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    // },
    slug:{
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Vendor = mongoose.model('vendor', VendorScheme);