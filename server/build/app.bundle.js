'use strict';

var routes = require('./routes');
var controller = require('./controller');

/* Libraries */
var express = require('express');
// const router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// const rootModel = require('./models/Root');

/* Socket */
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

/* socket.io connection */
io.on('connection', function (socket) {
    console.log("Connected to Socket" + socket.id);
    // Receiving a get request for the tree from Client
    socket.on('getTree', function () {
        controller.getTree(io);
    });
    // Receiving a get request for a Node from Client
    socket.on('getNode', function (id) {
        console.log('socketData: ' + JSON.stringify(id));
        controller.getNode(io, id);
    });
    // Receiving a root from Client
    socket.on('addRoot', function (Root) {
        console.log('socketData: ' + JSON.stringify(Root));
        controller.addRoot(io, Root);
    });
    // Receiving a new Node from Client
    socket.on('addNode', function (data) {
        console.log('socketData: ' + JSON.stringify(data));
        controller.addNode(io, data);
    });
    // Recieving an Updated Node from Client
    socket.on('updateNode', function (NodeFactory) {
        console.log('socketData: ' + JSON.stringify(NodeFactory));
        controller.updateNode(io, NodeFactory);
    });
    // Recieving a Node Id to Delete
    socket.on('deleteNode', function (id) {
        console.log('socketData: ' + JSON.stringify(id));
        controller.deleteNode(io, id);
    });
    // Recieving a Tree Id to Delete
    socket.on('deleteTree', function (id) {
        console.log('socketData: ' + JSON.stringify(id));
        controller.deleteTree(io, id);
    });
});

/* Cors */
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* Server configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* Port */
var port = 3000;

/* Database Connection */
mongoose.connect("mongodb://localhost:27017/TreeAngularApp", { useNewUrlParser: true });

app.use('/', routes);
//app.use(router);

app.get('/', function (req, res) {
    return res.end('Api working');
});

/* catch 404 */
app.use(function (req, res, next) {
    res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

/* Start the server */
server.listen(port, function () {
    console.log('App Server Listening at ' + port);
});

// // Creates a root
// router.route('/').post(
//     (req, res) => {
//         rootModel.create(req.body)
//             .then(function (node) {
//                 res.json(node);
//             }).catch(function (err) {
//                 res.json(err);
//             });
//     });

// // Add a NodeFactory to the Tree
// router.route('/:id').post(
//     (req, res) => {
//         rootModel.findOne({ _id: req.params.id })
//             .then((root) => {
//                 root.children.push(req.body);
//                 return root.save();
//             }).then((root) => {
//                 res.json(root);
//                 console.log(root);
//             }).catch(e => res.status(400).send(e));
//     });

// // Get the tree
// router.route('/').get(
//     (req, res) => {
//         rootModel.find({})
//             .then(function (node) {
//                 res.json(node);
//             })
//             .catch(function (err) {
//                 res.json(err);
//             });
//     });

// // Get a NodeFactory by position
// router.route('/:position').get(
//     (req, res) => {
//         rootModel.aggregate([
//             {
//                 $project: {
//                     child: { $arrayElemAt: ['$children', parseInt(req.params.position)] }
//                 }
//             }
//         ]).exec((err, child) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.json(child);
//             }
//         });
//     });

// // Update a NodeFactory
// router.route('/').put(
//     (req, res) => {
//         rootModel.findOne({ 'children._id': req.body.idNF })
//             .then((root) => {
//                 const oldNode = root.children.id(req.body.idNF);
//                 oldNode.set(req.body.data);
//                 return root.save();
//             }).then((root) => {
//                 res.send({ root });
//                 console.log(root);
//             }).catch(e => res.status(400).send(e));
//     });

// // Delete a NodeFactory
// router.route('/:idNF').delete(
//     (req, res) => {
//         rootModel.findOne({ 'children._id': req.params.idNF })
//             .then((root) => {
//                 root.children.id(req.params.idNF).remove();
//                 return root.save();
//             }).then((root) => {
//                 res.send({ root });
//             }).catch(e => res.status(400).send(e));
//     });


// app.listen(PORT, function () {
//     console.log('listening on port 3000!');
// })
