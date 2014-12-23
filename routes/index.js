var express = require('express');
var router = express.Router();
var hospital_routes = require('../own_modules/hospital_routes');

var loadUserFromSession = function(req,res,next){
  var user = req.session.userEmail;
  if(user){
    req.user = user;
    res.locals.user = user;
  }else{
    delete req.session.userEmail;
  }
  next();
};

var requireLogin = function(req,res,next){
  req.user? next(): res.redirect('/login');
};

router.use(loadUserFromSession);

router.get('/', function(req, res) {
  res.render('index', { title: 'Hospital' });
});

router.get('/patients',hospital_routes.get_patients);

router.get('/doctors',function(req,res){
	res.render('doctors_index');
});

router.get('/register',function(req,res){
	res.render('register');
});

router.post('/register', hospital_routes.add_new_doctor);

router.get('/login',function(req,res){
	res.render('login');
});

router.post('/login', hospital_routes.login_doctor);

router.get('/dashboard/:id',function(req,res){
	res.render('dashboard');
});

module.exports = router;
