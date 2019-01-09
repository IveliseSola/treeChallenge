
const express = require('express');
const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rootModel = require('./models/Root');

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
    (req, res) => {
        rootModel.create(req.body)
            .then(function (node) {
                res.json(node);
            }).catch(function (err) {
                res.json(err);
            });
    });

// Add a NodeFactory to the Tree
router.route('/:id').post(
    (req, res) => {
        rootModel.findOne({ _id: req.params.id })
            .then((root) => {
                root.children.push(req.body);
                return root.save();
            }).then((root) => {
                res.json(root);
                console.log(root);
            }).catch(e => res.status(400).send(e));
    });

// Get the tree
router.route('/').get(
    (req, res) => {
        rootModel.find({})
            .then(function (node) {
                res.json(node);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
// Get a NodeFactory by position
router.route('/:position').get(
    (req, res) => {
        rootModel.aggregate([
            {
                $project: {
                    child: { $arrayElemAt: ['$children', parseInt(req.params.position)] }
                }
            }
        ]).exec((err, child) => {
            if (err) {
                console.log(err);
            } else {
                res.json(child);
            }
        });
    });

// Update a Nodefactory
router.route('/').put(
    (req, res) => {
        rootModel.findOne({ 'children._id': req.body.idNF })
            .then((root) => {
                const oldNode = root.children.id(req.body.idNF);
                oldNode.set(req.body.data);
                return root.save();
            }).then((root) => {
                res.send({ root });
                console.log(root);
            }).catch(e => res.status(400).send(e));
    });

// Delete a NodeFacctory
router.route('/:idNF').delete(
    (req, res) => {
        rootModel.findOne({ 'children._id': req.params.idNF })
            .then((root) => {
                root.children.id(req.body.idNF).remove;
                return root.save();
            }).then((root) => {
                res.send({ root });
                console.log(root);
            }).catch(e => res.status(400).send(e));
    })
app.use(router);

app.listen(PORT, function () {
    console.log('listening on port 3000!');
})