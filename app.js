var express = require("express");
var mongoose = require("mongoose");
bodyParser = require('body-parser');
var app = express();
var Data = require("./model/data");
mongoose.connect('mongodb://localhost:" + process.env.DB_PORT + "/test_Demo', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
require("dotenv").config();
app.get("/add", function (req, res) {
    var newUSer = [{
        firstName: "Zeel".toLowerCase(),
        lastName: "patel".toLowerCase(),
        age: 26,
        standard: 20
    }, {
        firstName: "manisha".toLowerCase(),
        lastName: "Ahir".toLowerCase(),
        age: 12,
        standard: 12
    }, {
        firstName: "himani".toLowerCase(),
        lastName: "Vagasiya".toLowerCase(),
        age: 29,
        standard: 27
    }, {
        firstName: "Keyur".toLowerCase(),
        lastName: "Jatt".toLowerCase(),
        age: 20,
        standard: 12
    }];
    Data.create(newUSer, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", { Datas: user, url: process.env.url });
        }
    });
});
app.get("/", function (req, res) {
    Data.find({}, function (err, allData) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {Datas: allData, url: process.env.url});
        }
    });
});
app.post("/sorting", function (req, res) {
    var column = req.body.field;
    var seq = parseInt(req.body.seq);
    var sort = {};
    if (column === 'first_name') {
        sort = { 'firstName': seq };
    }
    if (column === 'last_name') {
        sort = { 'lastName': seq };
    }
    if (column === 'age') {
        sort = { 'age': seq };
    }
    if (column === 'standard') {
        sort = { 'standard': seq };
    }
    Data.find({}).sort(sort).exec(function (err, allData) {
        if (err) {
            console.log(err);
        } else {
            res.render('show', {Datas: allData, url: process.env.url} );
        }
    });
});
app.listen(process.env.PORT, function () {
    console.log("server started");
});
