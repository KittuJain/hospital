var location = process.argv[2];
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(location);

var initializeQuery = ['create table patients(id integer autoincrement,'+
	' name text, age integer, gender text, address text, phone integer,'+
	' E_mail text primary key, password text, details text, doctor_email text not null, '+
	'foreign key(doctor_email) references doctors(E_mail));',

	'create table doctors(id integer autoincrement, name text, specialist text, password text,'+
	' E_mail text primary key, phone integer, address text);'];

var runAllQueries = function(){
	var runQuery = function(query){
		console.log(query);
		db.run(query,function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
		});
	};
	initializeQuery.forEach(runQuery);
};

db.serialize(runAllQueries);