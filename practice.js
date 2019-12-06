const express = require('express');
const app = express();
app.use(express.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";


app.get('/', (req,res) => {
res.send('Welcome to REST API with Node.js Tuorial!!!');
});

//1. Write nodejs code to connect to your mongoDB database and list down all the collections from you database. (1 mark)


app.get('/api/collections', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  dbo.listCollections().toArray(function(err, result)  {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});

});


//2. Create at least two or more GET services which will read data from your database collections. (2 marks)

app.get('/api/students', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  dbo.collection("student").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});

});


app.get('/api/instructors', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  dbo.collection("instructor").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result); 
    db.close();
  });
});

});


//3. Create at least two or more GET services with parameters which will read data from your database collections based on parameter. (1 mark)


app.get('/api/students/:student_name', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  dbo.collection("student").find({"student_name": (req.params.student_name)}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
	if(!result) res.status(404).send('Ooops... Cannot find !!!');
    db.close();
  });
});
});


app.get('/api/departments/:department_id', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  dbo.collection("department").find({"department_id": parseInt(req.params.department_id)}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send(result);
    db.close();
  });
});
});


//4. Write PUT Service to update at least 2 collections. (2 mark)


app.put('/api/students/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myquery = { "student_name": "Raman" };
  var newvalues = { $set: {"student_name": "Navdeep" } };
  dbo.collection("student").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});

});

app.put('/api/courses/update', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myquery = { "course_name": "System Design" };
  var newvalues = { $set: {"course_name": "Enterprise Technologies" } };
  dbo.collection("course").updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send("1 document updated");
    db.close();
  });
});

});

//5. Write POST Service to insert documents in at least 2 collections. (2 mark)

app.post('/api/students/insert', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myobj = { "student_id": "210","student_name": "Joben", "student_address": "Brampton","student_phone":"6666666666","student_email":"joben@gmail.com" };
  dbo.collection("student").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document inserted");
    console.log("1 document inserted");
    db.close();
  });
});
});

app.post('/api/courses/insert', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myobj = { "course_id": "110","course_name": "Enterprise" };
  dbo.collection("course").insertOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document inserted");
    console.log("1 document inserted");
    db.close();
  });
});
});



//6.Write Delete Service to delete documents in at least 2 collections. (2 mark)

app.delete('/api/students/delete', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myobj = { "student_id": "210"};
  dbo.collection("student").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});


app.delete('/api/courses/delete', (req,res) => {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("collegeDatabase");
  var myobj = { "course_id": "110"};
  dbo.collection("course").deleteOne(myobj, function(err, result) {
    if (err) throw err;
    res.send("1 document deleted");
    console.log("1 document deleted");
    db.close();
  });
});
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log('Listening to port ${port}..'));