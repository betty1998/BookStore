var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bookSchema,
	Book,
	bodyParser = require('body-parser');

// var dotEnv = require('dotenv'),
// 	cors = require('cors'),
// 	jwt = require('jsonwebtoken'),
// 	bcrypt = require('bcrypt');

// initialization to allow nodejs get access to env file
// process.env will be available to use
// dotEnv.config();

// use/apply a middleware
// add Access-Control-Allow-Origin in response header
// app.use(cors());
app.use(bodyParser.json()); // very important to parse json data
app.listen(8080,() => console.log("connect to port 8080 successfully"));

// connect to mongodb with mongoose
mongoose.Promise = Promise; //promise is a ES6 API
mongoose.connect('mongodb://localhost:27017/mercury')
	.then(()=> console.log('mongodb connected!'))
	.catch((err)=> console.log(err.message));

// create schema for book
bookSchema = new Schema({
	id: {type: String, unique: true, required: true},
	name: String,
	price: {type: Number, min: Number.MIN_VALUE, required: true},
	author: String
}, {collection: 'books'});

Book = mongoose.model('books',bookSchema);


// Get all
app.get('/books', function getBooks(req, res, next) {
	console.log("getting all books")
	Book.find({})
		.then((doc)=>{
			res.send(doc);
		})
		.catch((err)=>{
			res.send({success: false, message: err});
		});
})

// Get by id
app.get('/books/:id', function getById(req, res, next) {
	var id = req.params.id;
	console.log("getting book by id:", id);
	Book.find({id:id})
	.then((doc)=>{
		res.send(doc);
	})
	.catch((err)=>{
		res.send({success: false, message: err});
	});
})

// Post
app.post('/books',function postBook(req, res, next) {
	body = req.body;
	// handle array
	if(Array.isArray(body)){
		body.forEach((b) => {
		var book = new Book(b);
		console.log("posting book:", book.name);
		book.save()
		.catch((err)=>{
			res.send({success: false, message: err});
			});
		});
		res.send(req.body);
	}else{
		var book = new Book(body);
		console.log("posting book:", book.name);
		book.save()
		.then((doc)=>{
			res.send(doc);
		})
		.catch((err)=>{
			res.send({success: false, message: err});
		});
	}

	
})

// Put by id
app.put('/books/:id', function updateById(req, res, next) {
	var id = req.params.id;
	console.log("updating book by id:", id);
	Book.updateOne({id:id},req.body)
	.then((doc)=>{
		// res.send(doc);
		res.send(req.body);
	})
	.catch((err)=>{
		res.send({success: false, message: err});
	});
})

// Delete by id
app.delete('/books/:id', function deleteById(req, res, next) {
	var id = req.params.id;
	console.log("deleting book by id:", id);
	Book.deleteOne({id:id})
	.then((doc)=>{
		res.send(doc);
	})
	.catch((err)=>{
		res.send({success: false, message: err});
	});
})


