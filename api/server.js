var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8080;

app.listen(port, function () {
	console.log('Servidor ON');
});

var db = new mongodb.Db(
	'instagram',
	new mongodb.Server('localhost', 27017, {}),
	{}
);

app.get('/', function (req, res) {
	res.send({msg: 'Olá'});
});

app.post('/api', function(res, req) {
	var dados = req.body;

	db.open(function(err, mongoclient) {
		mongoclient.collection('postagens', function(err, collection) {
			collection.insert(dados, function(err, records) {
				if(err) 
				{
					res.json(err);
				}
				else
				{
					res.json(records);
				}
				mongoclient.close();
			});
		});
	});
});

