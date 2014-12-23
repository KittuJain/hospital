var hospital_records = require('./hospital_records').init('./data/hospital.db');
var bc = require('bcryptjs');
var _ = require('lodash');

exports.get_patients = function(req,res){
	hospital_records.getPatients(function(err,patients){
		res.render('patients',{patients:patients});
	});
};

exports.add_new_doctor = function(req,res){
  var salt = bc.genSaltSync(10);
  var hash = bc.hashSync(req.body.password,salt);
  var doctor_info = {name : req.body.name,
						email : req.body.email,
						password : hash,
						address : req.body.address,
						specialist : req.body.specialist,
						phone : req.body.phone
					};

	hospital_records.addNewDoctor(doctor_info,function(err){
		err ? res.render('register',doctor_info) :
    	hospital_records.getNewDoctor(function(err,doctor){
       res.redirect('/dashboard/'+doctor.id);      
    });
  });
};

exports.login_doctor = function(req,res){
	hospital_records.getDoctorEmailAndPassword(function(err,doctors){
    var doctor = _.find(doctors,{email:req.body.email});
    if(doctor && bc.compareSync(req.body.password,doctor.password)){
      req.session.userEmail = doctor.email;
      res.redirect('/dashboard/'+doctor.id);
    }
    else
    	res.render('login',{error:'Invalid email or password'});
  });
};