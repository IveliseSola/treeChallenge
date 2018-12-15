
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const db = require('./models/Node');
const router = require('express').Router();
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

// Database conection
mongoose.connect("mongodb://localhost/treeApp", { useNewUrlParser: true });

// Crontrol Allow Origin

router.route('/node').post(
  function (req, res) {
    console.log(req)
    db.create(req.body)
      .then(function (node) {
        res.json(node);
        console.log(res.json(node));
      })
      .catch(function (err) {
        res.json(err);
        console.log(res.json(err));
      });
  });

app.use(router);

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// Routes

// get Root
// app.get('/tree', function (req, res) {
//   db.Tree.find({})
//     .then(function (dbTree) {
//       res.json(dbTree);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// });

//create a root

// app.post('/node', async (req, res) => {
//   try {
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
//     console.log(req);
//     const node = await db.create(req.body);
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
//     console.log(req);
//     console.log(node);
//     return res.json(node);
//   } catch (err) {
//     // return err;
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
//     console.log(req.body);
//     console.log(err);
//   }
// });

// let node = new dbModels.Node({name:'NodeA', parent:'NodeB', children:[]});
// let factoryNode = new dbModels.FactoryNode({name:'NodeB', parent:'', children:['NodeA'], min: 20, max:60});

// dbModels.Node.create({name:'NodeC', parent:'', children:['TinyC'] })
// .then(function(dbNode) {
//   console.log(dbNode);
// })
// .catch(function(err) {
//   console.log(err.message);
// });

// dbModels.FactoryNode.create({name:'NodeB', parent:'', children:['NodeA'], min: 20, max:60})
// .then(function(dbFactoryNode) {
//   console.log(dbFactoryNode);
// }).catch(function (err) {
//   console.log(err);
// })

app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});