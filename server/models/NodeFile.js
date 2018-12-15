const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    nodeType: {
        type:String,
        default: undefined
    },    
    children: {
        type: Array,
        default: []
    }    
});

const NodeFile = mongoose.model('Node', NodeSchema);

module.exports = NodeFile;
    
