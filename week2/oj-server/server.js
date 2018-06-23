var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var mongoose = require("mongoose");

mongoose.connect("mongodb://frank:frank19940205@ds117101.mlab.com:17101/collaborativesystem");


app.use("/api/v1", restRouter);

app.listen(3000, function () {
  console.log('App listening on port 3000   !');
});
