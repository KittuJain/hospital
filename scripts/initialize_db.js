var location = process.argv[2];
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(location);

var initializeQuery = ['create table patients(id integer primary key autoincrement,'+
	' name text, age integer, gender text, address text, phone integer,'+
	' email text, password text, details text, doctor_id integer not null, '+
	'foreign key(id) references doctors(id));',

	'create table doctors(id integer primary key autoincrement, name text, specialist text, password text,'+
	' email text, phone integer, address text);'];

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