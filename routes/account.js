var express = require('express');
var router = express.Router();
// var controller = require('../controllers/main.js')

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

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

/* GET users listing. */
router.get('/', authenticate, function(req, res, next) {
	res.render('account.ejs', { title: 'My Account' });
});

router.get('/edit', authenticate, function(req, res, next) {
	res.render('account-edit.ejs', { title: 'Edit Account '});
});

router.post('/edit', authenticate, function(req, res, next) {
	console.log(req.body);

});


module.exports = router;