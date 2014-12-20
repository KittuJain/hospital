var hospital_records = require('./hospital_records').init('./data/hospital.db');
var bc = require('bcryptjs');
var _ = require('lodash');

exports.get_patients = function(req,res){
	hospital_records.getPatients(function(err,patients){
		res.render('patients',{patients:patients});
	});
};