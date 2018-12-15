const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./models/NodeFile');

const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));

mongoose.connect("mongodb://localhost:27017/TreeAngularApp");

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post('/home', function (req, res) {
    db.NodeFile.create(req.body)
    .then(function(dbNode){
        return db.NodeFile.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    })
    
    // let modelNode = new model(req.body);
    // if (req.body.mode == 'Save') {
    //     modelNode.save(function (err, res) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send({ data: 'Record has been Inserted!' });
    //         }
    //     });
    // } else {
    //     model.findByIdAndUpdate(req.body.id, { name: req.body.name, type: req.body.type, children: req.body.children },
    //         function (err, data) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.send({ data: 'Record has been Update!' });
    //             }
    //         });
    // }
})

app.post('/delete', function (req, res) {
    model.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send({ data: 'Record has been Deleted!' })
        }
    });
})

app.get('/getNodes', function (req, res) {
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.send(data);
        }
    });
})

app.listen(PORT, function () {
    console.log('listening on port 3000!');
})