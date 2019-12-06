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

app.post('/users_create', (req,res) => {
	console.log("Trying to create a new user..");
	console.log("Book name: "  + req.body.book_name);
	res.send('1 document inserted');
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  var dbo = db.db("exam2_c0743324");
	  var myobj = { "Name":req.body.book_name, "Author":req.body.author};
	  dbo.collection("books_c0743324").insertOne(myobj, function(err, result) {
		if (err) throw err;
		res.send(result);
		console.log("1 document inserted");
		db.close();
	  });
	});

});

app.get('/users_get', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("exam2_c0743324");
  dbo.collection("books_c0743324").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});

});

app.post('/users_update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("exam2_c0743324");
  var myquery = { "Name":req.body.book_name};
  var newvalues = { $set: {"Author": req.body.author } };
  dbo.collection("books_c0743324").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});

app.post('/users_delete', (req,res) => {
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("exam2_c0743324");
   var myobj = { "Name": req.body.book_name};
   dbo.collection("books_c0743324").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});


//3.	Create a GET Method Service “/API/YourStudentID/Books” which will return list of all the Books (2 Marks)
app.get('/API/c0743324/Books', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("exam2_c0743324");
  dbo.collection("books_c0743324").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});

});

//4.	Create a POST Method Service “/API/YourStudentID/Book/” which will insert new Book to the Book Collection (2 marks)
app.post('/API/c0743324/Book/', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("exam2_c0743324");
  var myobj = { "BId": "6","Name":"Hindi", "Author":"Joben", "Price":"300","PublishDate":"03-02-2019"};
  dbo.collection("books_c0743324").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log("1 document inserted");
    db.close();
  });
});
});


//5.	Create a PUT Method Service “/API/YourStudentID/Book/:BId” which will update Author name of the Book by your name where Book ID is the BId you passed. (2 marks)

app.put('/API/c0743324/Book/:BId', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("exam2_c0743324");
  var myquery = { BId:(req.params.BId)};
  var newvalues = { $set: {"Author": "Rajpreet Kaur" } };
  dbo.collection("books_c0743324").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});




//6.	Create a Delete Method Service “/API/YourStudentID/Book/:BId” which will delete the Book where Book ID is the BId you have passed. (2 marks)

app.delete('/API/c0743324/Book/:BId', (req,res) => {
   MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   var dbo = db.db("exam2_c0743324");
   var myobj = { BId:(req.params.BId)};
   dbo.collection("books_c0743324").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));



