const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Node = require('./FactoryNode');
const FileNode = require('./FileNode');

const TreeSchema = new Schema ({
    // root: {
    //     type: Schema.Types.ObjectId, ref: 'Node'
    // }
    filename: {
        type: String,
        trim: true,
        required: true
    },
    children:[FileNode]
})

const Tree = mongoose.model('Root', TreeSchema);

module.exports = Tree;