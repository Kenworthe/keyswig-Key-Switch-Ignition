var mongoose = require('mongoose');
var User = require('./models/user.js');
var Car = require('./models/car.js');

// Connect to database: mlabs OR localhost
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/carswap');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});


// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('Removing all kentest Users...');
User.remove({ 'local.email': { $regex: '@kentest.com$' }})
.then(function() {
	console.log('Removed all kentest Users.');
	console.log('creating some new kentest Users...');
	
	var albert  = new User({ 
		title: 'groceries',
		completed: false 
	});

	var ben = new User({ 
		title: 'feed the cat', 
		completed: true  
	});

	var carlos = new User({ 
		title: 'feed the cat', 
		completed: true  
	});

return Todo.create([groceries, feedTheCat]);
})
.then(function(savedTodos) {
  console.log('Just saved', savedTodos.length, 'todos.');
  return Todo.find({});
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  return Todo.findOne({title: 'groceries'});
})
.then(function(groceries) {
  groceries.completed = true;
  return groceries.save();
})
.then(function(groceries) {
  console.log('updated groceries:', groceries);
  return groceries.remove();
})
.then(function(deleted) {
  return Todo.find({});
})
.then(function(allTodos) {
  console.log('Printing all todos:');
  allTodos.forEach(function(todo) {
    console.log(todo);
  });
  quit();
});
