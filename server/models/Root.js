const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NodeFactorySchema = require('./NodeFactory');

const RootSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    children: [NodeFactorySchema]
})

const Root = mongoose.model('Root', RootSchema);

module.exports = Root;