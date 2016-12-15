var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Car = require('../models/car.js');

// This function is necessary to authorize authenticated users only.
function authenticate(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('error', 'Oops! You are not logged in. Please sign up or login to continue.');
		res.redirect('/');
	}
	else {
		next();
	}
}

// GET garage, all of user's cars.
router.get('/', authenticate, function(req, res, next) {
	Car.find({ 'owner': currentUser._id }).populate('owner')
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
  //need to add: also pull data about what car is currently being swapped.
});

// GET isSwappable Toggle
router.get('/:id/toggle', authenticate, function(req, res, next) {
	Car.findOne({ _id: req.params.id }, function(err, car){
		if (!car){
			return next(err);
		}
		else {
			car.isSwappable = !car.isSwappable;
			return car.save();
		}
	})
    .then(function(saved) {
      res.redirect('/my-garage');
    }, function(err) {
      return next(err);
    });
});

// GET add car form
router.get('/add', authenticate, function(req, res, next){
	res.render('car-add.ejs', { title: 'Add Car' });
});

//POST add car data 
router.post('/add', authenticate, function(req, res, next){
	// logic for POSTing new car. Need to link to Edmunds API here.
	var car = new Car ({
		owner: 			currentUser._id,
		borrower: 		null,
		isSwappable:	true,
		make: 			req.body.make,
		model: 			req.body.model,
		year: 			req.body.year,
		transmission:	req.body.transmission,
		color: 			req.body.color,
		licensePlate: 	req.body.licensePlate,
		mileage: 		req.body.mileage,
		location: 		currentUser.location,
		description: 	req.body.description
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
	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		if (carFound.owner.toString() !== currentUser._id.toString()) {
			req.flash('error', 'Car ID does not match Owner ID.');
			res.redirect('/my-garage');
		}
		else {
			res.render('car-details.ejs', { car: carFound, title: 'Car Details' })
		}
	})
	.catch(function(err){
		return next(err);
	});
});

// GET edit car page
router.get('/:id/edit', authenticate, function(req, res, next) {
	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		if (carFound.owner.toString() !== currentUser._id.toString()) {
			req.flash('error', 'Car ID does not match Owner ID.');
			res.redirect('/my-garage/');
		}
		else {
			res.render('car-edit.ejs', { car: carFound, title: 'Edit Car' });
		}
	})
	.catch(function(err){
		return next(err);
	});
});

router.put('/:id/edit', authenticate, function(req, res, next) {
	Car.findOne({ _id: req.params.id })
	.then(function(carFound){
		carFound.make = 		req.body.make;
		carFound.model = 		req.body.model;
		carFound.year = 		req.body.year;
		carFound.color = 		req.body.color;
		carFound.transmission = req.body.transmission;
		carFound.licensePlate = req.body.licensePlate;
		carFound.mileage = 		req.body.mileage;
		carFound.description = 	req.body.description;
		carFound.save();
	})
	.then(function(savedCar){
		res.redirect('/my-garage');
	})
	.catch(function(err){
		return next(err);
	});
});

router.delete('/:id', authenticate, function(req, res, next){
	Car.findByIdAndRemove({ _id: req.params.id })
	.then(function(removedCar){
		res.redirect('/my-garage');
	})
	.catch(function(err){
		return next(err);
	});
});

module.exports = router;