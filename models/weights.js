const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
    weight: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        require: true
    }
});

const Weight = mongoose.model('Weight', weightSchema);
module.exports = Weight;

//test feature