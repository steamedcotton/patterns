var express = require('express');
var app = express();
var redis = require("redis");
var r = require('rethinkdb');
var rethinkdb = {
    host: 'rethinkdb',
    port: 28015,
    authKey: '',
    db: 'awesome'
    };
var host = 'redis';
var port =  6379;
var client = redis.createClient(port, host);

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/', function (req, res) {
    client.incr('sitehits');
    client.get('sitehits', (err, numberOfHits) => {
        if (err) {
            res.send('got an error');
        } else {
            res.send('Super awesome app part 2 --- Number of Hits: ' + numberOfHits);
        }
    });
});

app.listen(3000, function () {
    console.log('Super great app listening on port 3000');
});


r.connect(rethinkdb, function(err, conn) {
    r.dbCreate(rethinkdb.db).run(conn,
        function(err, results) {
            console.log(results);
        });
});