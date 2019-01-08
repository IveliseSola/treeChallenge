const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const NodeLeafSchema = require('./NodeLeaf');

const NodeFactorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    minValue: {
        type: Number
    },
    maxValue: {
        type: Number
    },
    leaves: {
        type: Array
    }
});



//const NodeFactory = mongoose.model('NodeFactory', NodeFactorySchema);

module.exports = NodeFactorySchema;

