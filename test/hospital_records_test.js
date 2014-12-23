var lib = require('../own_modules/hospital_records');
var assert = require('chai').assert;
var fs = require('fs');
var dbFileData = fs.readFileSync('test/data/hospital.db.backup');

var hospital_records;
describe('hospital_records',function(){
	beforeEach(function(){
		fs.writeFileSync('test/data/hospital.db',dbFileData);
		hospital_records = lib.init('test/data/hospital.db');
	});

	describe('#getPatients',function(){
		it('gets all the patients present in hospital',function(done){
			hospital_records.getPatients(function(err,patients){
				assert.deepEqual(patients,[{name:'Soniya Garg'},{name:'Vikki Sharma'}]);
				done();
			});
		});
	});

	describe('#getDoctorEmailAndPassword',function(){
		it('retrieves doctors email and password',function(done){
			hospital_records.getDoctorEmailAndPassword(function(err,doctors){
				assert.deepEqual(doctors,[{id:1, email:'drHarishMarwa@rediffmail.com', password:'harish'},
					{id:2, email:'aniltaneja@rediffmail.com', password:'anil'},
					{id:3, email:'drKratiJain@gmail.com', password:'krati'}]);
				done();
			});
		});
	});

	describe('#addNewDoctor',function(){
		it('add a new doctor in doctors table',function(done){
			var doctor = {name:'Vikas Pal', specialist:'ENT', password:'vikas',
				email:'drpalVikas@rediffmail.com',phone:5645712777,address:'23/5 Shastri Nagar'};

			var expected = [{id:1, email:'drHarishMarwa@rediffmail.com', password:'harish'},
					{id:2, email:'aniltaneja@rediffmail.com', password:'anil'},
					{id:3, email:'drKratiJain@gmail.com', password:'krati'},
					{id:4, email:'drpalVikas@rediffmail.com', password:'vikas'}];

			hospital_records.addNewDoctor(doctor,function(err){
				assert.notOk(err);
				hospital_records.getDoctorEmailAndPassword(function(err,doctors){
				assert.deepEqual(doctors,expected);
					done();
				});
			});
		});
	});
});
