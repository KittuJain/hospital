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
});
