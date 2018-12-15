
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    nodeName: {
        type: String,
        trim: true,
        required: true
    },
    parent: {
        type: String,
        default: undefined
    },    
    children: {
        type: Array,
        default: []
    },
    nodeType: {
        type: String,
        trim: true,
        required: true
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 0
    }   
});

const Node = mongoose.model('Node', NodeSchema);

module.exports = Node;
    
