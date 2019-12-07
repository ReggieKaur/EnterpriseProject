const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bodyParser= require('body-parser')


app.use(express.static('./public'));

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// b.	Insert data into your database through POST Services.
app.post('/users_create', (req,res) => {
	
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("collegeDatabase");
	  var myobj = { "student_id":req.body.student_id, "student_name":req.body.student_name, "student_phone":req.body.student_phone, "student_address": req.body.student_address, "student_email":req.body.student_email, "courses_taken":req.body.courses_taken};
	  dbo.collection("student").insertOne(myobj, function(err, result) {
		if (err) throw err;
		res.send(result);
		console.log(result);
		db.close();
	  });
	});

});

	
//a.	Read data from your database through GET Services.
app.get('/users_get', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var show = req.body.collection_name;
  dbo.collection("student").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});


//c.	Update data into your database through PUT Services.
app.post('/users_update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myquery = { "student_id":req.body.student_id};
  var newvalues = { $set: {"student_name":req.body.student_name, "student_phone":req.body.student_phone, "student_address": req.body.student_address, "student_email":req.body.student_email, "courses_taken":req.body.courses_taken} };
  dbo.collection("student").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});

//d.	Delete data from your database through DELETE Services. 
app.post('/users_delete', (req,res) => {
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("collegeDatabase");
   var myobj = { "student_id":req.body.student_id};
   dbo.collection("student").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log("1 document deleted");
    db.close();
  });
});
});


const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));