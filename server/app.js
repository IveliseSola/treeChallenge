
const express = require('express')
const mongoose = require('mongoose')
const Node = require('./models/Node');
const Tree = require('./models/Tree');

const PORT = 3000;
let app = express();

mongoose.connect("mongodb://localhost/treeApp");

app.post("/", function(req, res){
    const tree = new Tree(req.body);

    Tree.create(tree)
    .then(function(root) {
      res.json(root);
    })
    .catch(function(err) {
      res.json(err);
    });

});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });