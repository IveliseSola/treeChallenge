
const express = require('express');
const router = require('express').Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models/FileNode');

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

router.route('/').post(
    function (req, res) {
        db.create(req.body)
            .then(function (node) {
                res.json(node);
            }).catch(function (err) {
                res.json(err);
            });
    });

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

router.route('/:position').get(
    function (req, res) {
        db.aggregate([
            {
                $project: {
                    child: { $arrayElemAt: ['$children', parseInt(req.params.position)] }
                }
            }
        ]).exec(function (err, child) {
            console.log(err);
            res.json(child);
            console.log(child);
        });
    });

router.route('/:data').put(
    function (req, res) {
        db.aggregate([
            {
                $project: {
                    child: { $arrayElemAt: ['$children', parseInt(req.params.data.position)] }
                }
            }
        ]).exec(function (err, child) {
                  db.update( {'$children': child},
                             { $set:{ '$filename': req.params.data.name , 
                                      '$minValue': req.params.data.minValue,
                                      '$maxValue': req.params.data.maxValue } })
        })
    })
router.route('/').put(
    function (req, res) {
        db.findOneAndUpdate({ 'type': 'root' }, req.body)
            .then(function (node) {
                res.json(node);
                console.log('hey i am inside the put request backend');
            }).catch(function (err) {
                res.json(err);
            });
    }
)

app.use(router);

app.listen(PORT, function () {
    console.log('listening on port 3000!');
})