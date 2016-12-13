var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Car = require('../models/car.js');

// This function is necessary to authorize authenticated users only.
function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('error', 'Please signup or login.');
		res.redirect('/');
	}
	else {
		next();
	}
}

// GET all of user's cars.
router.get('/', authenticate, function(req, res, next) {
	Car.find({ 'owner': currentUser._id })
	.then(function(carsFound){
		res.render('garage.ejs', { 
			cars: carsFound, 
			title: 'My Garage', 
			message: req.flash() 
		});
	},
	function(err) {
		return next(err);
	});
  //also pull data about what car is currently being swapped.

});

// GET add car form
router.get('/add', authenticate, function(req, res, next){
	res.render('car-add.ejs', { title: 'Add Car' });
});

//POST add car data 
router.post('/add', authenticate, function(req, res, next){
	console.log('-->submitting new car data: ');
	console.log(req.body);
	console.log('-->currentUser.id: ');
	console.log(currentUser);

	// logic for POSTing new car. Need to link to Edmunds API here.

	var car = new Car ({
		owner: currentUser._id,
		borrower: null,
		make: req.body.make,
		model: req.body.model,
		year: req.body.year,
		licensePlate: req.body.licensePlate,
		mileage: req.body.mileage,
		description: req.body.description
	});

	Car.create(car)
	.then(function(){
		res.redirect('/my-garage');
	},
	function(err){
		return next(err);
	});
});

//GET car details page
router.get('/:id', authenticate, function(req, res, next){
	console.log('GET car details page');
	console.log(req.params.id);
	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		console.log('GET Details. Found car: ' + carFound);
		res.render('car-details.ejs', { car: carFound, title: 'Car Details' })
	});
});

// GET edit car page
router.get('/:id/edit', authenticate, function(req, res, next){
	console.log('GET edit car page');
	console.log(req.params.id);
	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		console.log('GET Edit Page. Found car: ' + carFound);
		res.render('car-edit.ejs', { car: carFound, title: 'Edit Car Details' })
	});
});

router.put('/:id/edit', authenticate, function(req, res, next){
	console.log('-->submitting edit car data: ');
	console.log(req.body);

	var editCar = 


	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		carFound.make = 		req.body.make;
		carFound.model = 		req.body.model,
		carFound.year = 		req.body.year;
		carFound.licensePlate = req.body.licensePlate;
		carFound.mileage = 		req.body.mileage;
		carFound.description = 	req.body.description;
		carFound.save();
	})
	.then(function(saved){
		res.redirect('/my-garage');
	})
	.catch(function(err){
		return next(err);
	});
})

router.delete('/:id', authenticate, function(req, res, next){
	console.log('--> Submitting car data for deletion: ');
	console.log(req.params.id);
})

module.exports = router;