pragma foreign_keys = 'ON';
insert into doctors (id, name, specialist, password, email, phone,address)
	values (1,'Harish Marwa', 'cardiologist', 'harish', 'drHarishMarwa@rediffmail.com',5645908712,'213/3 Shastri Nagar'),
		(2,'Anil Taneja', 'orthopedist', 'anil', 'aniltaneja@rediffmail.com',8712452398,'34/2 Preet Vihar'),
		(3,'Krati Jain', 'oncologist', 'krati', 'drKratiJain@gmail.com',9753124689,'22/2 Koramangala');
		
insert into patients (id, name, age, gender, address, phone, email, details, doctor_id)
	values (1,'Soniya Garg', 32, 'female','216/3 shastri nagar', 5645342389,'soniya@gmail.com','fever',1),
		(2,'Vikki Sharma', 22, 'male','23/3 anand vihar', 9876543210,'vikkiRockstar@gmail.com','cancer',3);