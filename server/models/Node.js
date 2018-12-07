const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    parent: {
        type: String,
        default: undefined
    },    
    children: {
        type: Array,
        default: []
    }    
});

const Node = mongoose.model('Node', NodeSchema);

module.exports = Node;
    
