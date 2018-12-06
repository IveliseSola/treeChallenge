const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const Schema = mongoose.schema;

const NodeSchema = new Schema({
    name: string,
    parent: null,
    children: []
});


const NodeFactorySchema = NodeSchema.extend({
    min: number,
    max: number
});