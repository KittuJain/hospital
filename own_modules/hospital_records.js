var sqlite3 = require("sqlite3").verbose();

var _getpatients = function(db,onComplete){
	var patientsName = "select name from patients";
	db.all(patientsName,onComplete);
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
	};
	return records;
};
