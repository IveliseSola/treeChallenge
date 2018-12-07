const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TreeSchema = new Schema ({
    root: {
        type: Schema.Types.ObjectId, ref: 'Node'
    }
})

const Tree = mongoose.model('Tree', TreeSchema);

module.exports = Tree;