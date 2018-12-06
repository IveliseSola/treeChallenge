const express = require('express')
const mongoose = require('mongoose')

const PORT = 3000;

mongoose.connect("mongodb://localhost/treeApp");

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });