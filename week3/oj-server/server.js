var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://frank:frank19940205@ds117101.mlab.com:17101/collaborativesystem");
app.use(express.static(path.join('../public')));
app.use('/', indexRouter);
app.use("/api/v1", restRouter);
app.use(function (req, res) {
  res.sendFile("index.html", {root: path.join( '../public')});
});
app.listen(3000, function () {
  console.log('App listening on port 3000   !');
});
