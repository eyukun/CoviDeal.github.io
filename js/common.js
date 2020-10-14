/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/		

// Users
var users = {
	manager: {
		id: '1',
		username: 'admin',
		password: 'admin123',
		name: 'admin',
		position: 'manager',
		patientType: 'null',
		symptoms: 'null',
		centreID: '1'
	},

	manager1: {
		id: '3',
		username: 'adminadminadmin',
		password: 'adminadminadmin123',
		name: 'adminadminadmin',
		position: 'manager',
		patientType: 'null',
		symptoms: 'null',
		centreID: 'null'
	},

	tester: {
		id: '4',
		username: 'tester',
		password: 'tester123',
		name: 'tester',
		position: 'tester',
		patientType: 'null',
		symptoms: 'null',
		centreID: '1'
	},

	patient: {
		id: '5',
		username: 'patient',
		password: 'patient123',
		name: 'patient',
		position: 'patient',
		patientType: 'Close Contact',
		symptoms: 'cough',
		centreID: 'null'
	},
	
	officer: {
		id: '6',
		username: 'officer',
		password: 'officer123',
		name: 'officer',
		position: 'officer',
		patientType: 'null',
		symptoms: 'null',
		centreID: '1'		
	}	
}

// Users array
var allUsers = [];

// add in the users
for (var user in users){
	allUsers.push(users[user]);
}

var currentUser = {
	id: undefined,
	username: undefined,
	password: undefined,
	name: undefined,
	position: undefined,
	patientType: undefined,
	symptoms: undefined,
	centreID: undefined
}

function common(){
	let action = document.getElementById('action').value;
	switch(action){
		case 'login':
			loginFormSubmitted();
			break;
		default:
			alert(action);
			break;
	}
}

function loginFormSubmitted(){
	event.preventDefault();
	let loginFormData = captureLoginFormData();
	let login = false;
	for (var i = 0; i < allUsers.length; i++){
		if (loginFormData['username'] == allUsers[i].username && loginFormData['password'] == allUsers[i].password){
			currentUser['id'] = allUsers[i].id;
			currentUser['username'] = allUsers[i].username;
			currentUser['password'] = allUsers[i].password;
			currentUser['name'] = allUsers[i].name;
			currentUser['position'] = allUsers[i].position;
			currentUser['patientType'] = allUsers[i].patientType;
			currentUser['symptoms'] = allUsers[i].symptoms;
			currentUser['centreID'] = allUsers[i].centreID;
			login = true;
			switch (currentUser['position']){
				case 'manager':
					if (allUsers[i].centreID == 'null'){
						window.location.href = "RegisterTestCentre.html";
					}
					else {
						window.location.href = "RecordTester.html";
					}
					break;
				case 'tester':
					window.location.href = "FindPatient.html";
					break;
				case 'officer':
					window.location.href = "GenerateTestReport.html";
					break;
				case 'patient':
					window.location.href = "ViewTestingHistory.html";
					break;
				default:
					alert('User not defined !');
					window.location.href = "index.html";
					break;
			}
		}
	}
	if (login == false){
		alert('Invalid Username or Password !');
		window.location.href = "index.html";
	}
}

function captureLoginFormData(){
	let loginFormData = {};
	loginFormData["username"] = document.getElementById("username").value;
	loginFormData["password"] = document.getElementById("password").value;
	return loginFormData;
}



// validation function for modal
(function() {
'use strict';
window.addEventListener('load', function() {
	// Get the forms we want to add validation styles to
	var formVar = document.getElementsByClassName('needs-validation');
	// Loop over them and prevent submission
	var validation = Array.prototype.filter.call(formVar, function(form) {
		form.addEventListener('submit', function(event) {
			if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			}
			form.classList.add('was-validated')
			;
		}, false);
	});
}, false);
})();




/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/