var express = require('express');
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
	res.render('garage.ejs', { title: 'My Garage' });
  //need to add logic here that pulls cars data from db.
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
	console.log('-->currentUser: ');
	console.log(currentUser);
	req.flash('success', 'Printed car to console');
	res.redirect('/my-garage');
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
	Car.create(car);

});

//GET car details page
router.get('/:id', authenticate, function(req, res, next){
	res.render('car-details.ejs', { title: 'Add Car' }); // req.params.id
});

// GET edit car details page
router.get('/:id/edit', authenticate, function(req, res, next){
	res.render('car-edit.ejs');
});

router.post('/:id/edit', authenticate, function(req, res, next){
	console.log('-->submitting edit car data: ');
	console.log(req.body);
	//redirect to /my-garage
})

router.delete('/:id/delete')

module.exports = router;