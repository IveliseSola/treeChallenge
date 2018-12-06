// const node = require('./Node');
const mongoose = require('mongoose');
const Schema = mongoose.schema;

const TreeSchema = new Schema ({
    id: Schema.Types.ObjectId(),
    root: {
        type: Schema.Types.ObjectId, ref: 'Node'
    }
})

module.exports.Tree = mongoose.model('Tree', TreeSchema);