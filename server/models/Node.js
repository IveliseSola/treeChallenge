const mongoose = require('mongoose');
const Schema = mongoose.schema;
const extend = require('mongoose-schema-extend');


const NodeSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {
        type: String,
        trim: true
    },
    parent: {
        type: String,
        default: undefined,
    },    
    children: {
        type: Array,
        default: []
    }    
});

const NodeFactorySchema = NodeSchema.extend({
    _id: Schema.Types.ObjectId,
    min: {
        type:Number,
        default: 0
    },
    max: {
        type: Number,
        default: 0
    }
});

module.exports.Node = mongoose.model('Node', NodeSchema);
module.exports.NodeFactory = mongoose.model('NodeFactory', NodeFactorySchema);

