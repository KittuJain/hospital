var sqlite3 = require("sqlite3").verbose();

var _getpatients = function(db,onComplete){
	var patientsName = "select name from patients";
	db.all(patientsName,onComplete);
};

var _getDoctorEmailAndPassword = function(db,onComplete){
	var select_query = 'select id,email,password from doctors';
	db.all(select_query,function(err,doctors){
		onComplete(null,doctors);
	});
};

var _addNewDoctor = function(doctor,db,onComplete){
	var insertDoctor = 'insert into doctors(name,specialist,password,email,phone,Address) values'+
	' ("'+doctor.name+'","'+doctor.specialist+'","'+doctor.password+'","'+doctor.email+'","'+doctor.phone+'","'+
		doctor.address+'")';
	db.run(insertDoctor, function(err){
		err && console.log(err);
		onComplete(err);
	});
};

var _getNewDoctor = function(db,onComplete){
	var get_doctor_query = 'select * from doctors order by id desc';
	db.get(get_doctor_query,onComplete);
};


exports.init = function(location){
	var operate = function(operation){
		return function(){
			var onComplete = (arguments.length == 2)?arguments[1]:arguments[0];
			var arg = (arguments.length == 2) && arguments[0];

			var db = new sqlite3.Database(location,function(err){
				if(err){ onComplete(err); return; };
				db.run("PRAGMA foreign_keys = 'ON';");
				arg && operation(arg,db,onComplete);
				arg || operation(db,onComplete);
				db.close();
			});
		};
	};
	var records = {
		getPatients:operate(_getpatients),
		getDoctorEmailAndPassword:operate(_getDoctorEmailAndPassword),
		addNewDoctor:operate(_addNewDoctor),
		getNewDoctor:operate(_getNewDoctor)
	};
	return records;
};
