
const express = require('express')
const mongoose = require('mongoose')

const dbModels = require('./models');

const PORT = 3000;
let app = express();

mongoose.connect("mongodb://localhost/treeApp");

// app.post("/", function(req, res){
//     // const tree = new Tree(req.body);
//     const tree = {
//       root: req.body
//     }
//     dbModels.Tree.create(tree)
//     .then(function(root) {
//       res.json(root);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });

// });

let node = new dbModels.Node({name:'NodeA', parent:'NodeB', children:[]});
let factoryNode = new dbModels.FactoryNode({name:'NodeB', parent:'', children:['NodeA'], min: 20, max:60});

dbModels.Node.create({name:'NodeC', parent:'', children:['TinyC'] })
.then(function(dbNode) {
  console.log(dbNode);
})
.catch(function(err) {
  console.log(err.message);
});

dbModels.FactoryNode.create({name:'NodeB', parent:'', children:['NodeA'], min: 20, max:60})
.then(function(dbFactoryNode) {
  console.log(dbFactoryNode);
}).catch(function (err) {
  console.log(err);
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });