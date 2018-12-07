const Node = require('./Node');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FactoryNode = Node.discriminator('NodeFactory', new Schema({
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 0
    }
}))

module.exports = FactoryNode;