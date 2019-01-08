
const express = require('express');
const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models/Root');

const PORT = 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/TreeAngularApp", { useNewUrlParser: true });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Creates a root
router.route('/').post(
    function (req, res) {
        db.create(req.body)
            .then(function (node) {
                res.json(node);
            }).catch(function (err) {
                res.json(err);
            });
    });
// Get the tree
router.route('/').get(
    function (req, res) {
        db.find({})
            .then(function (node) {
                res.json(node);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
// Get a NodeFactory by position
router.route('/:position').get(
    function (req, res) {
        db.aggregate([
            {
                $project: {
                    child: { $arrayElemAt: ['$children', parseInt(req.params.position)] }
                }
            }
        ]).exec(function (err, child) {
            if (err) {
                console.log(err);
            } else {
                res.json(child);
            }
        });
    });
// Update a FactoryNode
router.route('/').put(
    function (req, res) {
        db.findOne({ _id: req.body.idRoot }, function (err, root) {
            if (err) {
                console.log(err);
            } else {
                root.children.id(req.body.idNF).remove();
                const aux = {
                    name: req.body.data.name,
                    minValue: req.body.data.minValue,
                    maxValue: req.body.data.maxValue,
                    leaves: req.body.data.children
                }
                root.children.push(aux);
                root.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    });
// Add a node to the tree
router.route('/:id').post(
    function (req, res) {
        db.findOne({ _id: req.params.id }, function (err, root) {
            if (err) {
                console.log(err);
            } else {
                const aux = {
                    name: req.body.name,
                    minValue: req.body.minValue,
                    maxValue: req.body.maxValue,
                    leaves: req.body.children
                }
                root.children.push(aux);
                root.save();
            }
        })
    }
)
app.use(router);

app.listen(PORT, function () {
    console.log('listening on port 3000!');
})