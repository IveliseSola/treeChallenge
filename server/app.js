
const routes = require ('./routes');
const controller = require('./controller');

/* Libraries */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Socket */
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

/* socket.io connection */
io.on('connection', (socket) => {
    console.log("Connected to Socket " + socket.id);

    // Receiving a get request for the tree from Client
    socket.on('getTree', (msg) => {
         console.log('getTree method' + msg);
         controller.getTree(io); 
    });
    // Receiving a get request for a Node from Client
    socket.on('getNode', (id) => {
        console.log('socketData: ' + JSON.stringify(id));
        controller.getNode(io, id);
    });
    // Receiving a root from Client
    socket.on('addRoot', (root) => {
        console.log('socketData: ' + JSON.stringify(root));
        controller.addRoot(io, root);
    });
    // Receiving a new Node from Client
    socket.on('addNode', (nodeFactory) => {
        console.log('socketData: ' + JSON.stringify(nodeFactory));
        controller.addNode(io, nodeFactory);
    });
    // Recieving an Updated Node from Client
    socket.on('updateNode', (nodeFactory) => {
        console.log('socketData: ' + JSON.stringify(nodeFactory));
        controller.updateNode(io, nodeFactory);
    });
    // Recieving a Node Id to Delete
    socket.on('deleteNode', (id) => {
        console.log('socketData: ' + JSON.stringify(id));
        controller.deleteNode(io, id);
    });
    // Recieving a Tree Id to Delete
    socket.on('deleteTree', (id) => {
        console.log('socketData: ' + JSON.stringify(id));
        controller.deleteTree(io, id);
    });
});

/* Cors */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Server configuration */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/* Port */
const port = 3000;

/* Database Connection */
mongoose.connect("mongodb://localhost:27017/TreeAngularApp", { useNewUrlParser: true });

app.use('/', routes);

/* Start the server */
server.listen(port, () => {
    console.log(`App Server Listening at ${port}`);
});