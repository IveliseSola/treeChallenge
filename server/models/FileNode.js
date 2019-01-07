const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NodeSchema = new Schema({
    filename: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type:String,
        default: undefined,
        required: true
    },    
    children: {
        type: Array,
        default: []
    },
    minValue:{
        type: Number
    },
    maxValue: {
        type: Number
    }
});

const FileNode = mongoose.model('FileNode', NodeSchema);

module.exports = FileNode;
    
