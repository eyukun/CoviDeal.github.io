/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/		

// Users initialised values
var users = {
		manager: {
			id: 1,
			username: 'admin',
			password: 'admin123',
			name: 'admin',
			position: 'manager',
			patientType: 'null',
			symptoms: 'null',
			centreID: 1
		},

	manager1: {
		id: 2,
		username: 'adminadminadmin',
		password: 'adminadminadmin123',
		name: 'adminadminadmin',
		position: 'manager',
		patientType: 'null',
		symptoms: 'null',
		centreID: 'null'
	},

	tester: {
		id: 3,
		username: 'tester',
		password: 'tester123',
		name: 'tester',
		position: 'tester',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1
	},

	patient: {
		id: 4,
		username: 'patient',
		password: 'patient123',
		name: 'patient',
		position: 'patient',
		patientType: 'Close Contact',
		symptoms: 'cough',
		centreID: '1'
	},
	
	officer: {
		id: 5,
		username: 'officer',
		password: 'officer123',
		name: 'officer',
		position: 'officer',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1		
	}	
}

// current id
var currentCentreID = 2;
var currentUserID = 6;



// Users array
var allUsers = [];

// add in the users
for (var user in users){
	allUsers.push(users[user]);
}

// current user info
var currentUser = {
	id: 'null',
	username: 'null',
	password: 'null',
	name: 'null',
	position: 'null',
	patientType: 'null',
	symptoms: 'null',
	centreID: 'null'
}


// create centre
var createCentre = {
	centreID: 'null',
	centreName: 'null',
	address: 'null',
	id: 'null'
}

// Centres initialised values
var centres = {
	kl: {
		centreID: 1,
		centreName: 'kl',
		address: '123, Jalan KL, KL',
		id: 1
	}
}


// Centres array
var allCentres = [];

// add in the centres
for (var centre in centres){
	allCentres.push(centres[centre]);
}


// function to determine which function going
function common(){
	let action = document.getElementById('action').value;
	
	switch(action){
		case 'login':
			loginFormSubmitted();
			break;
		case 'registerTestCentre':
			registerCentreFormSubmitted();
			break;
		case 'recordTester':
			recordTester();
			break;

		default:
			break;
	}
}

// login form
function loginFormSubmitted(){
	event.preventDefault();
	
	// get data from login form
	let formData = captureLoginFormData();
	let login = false;
	
	// verify the username and password
	for (let i = 0; i < allUsers.length; i++){
		if (formData['username'] == allUsers[i].username && formData['password'] == allUsers[i].password){
			// set the data to current user
			currentUser['id'] = allUsers[i].id;
			currentUser['username'] = allUsers[i].username;
			currentUser['password'] = allUsers[i].password;
			currentUser['name'] = allUsers[i].name;
			currentUser['position'] = allUsers[i].position;
			currentUser['patientType'] = allUsers[i].patientType;
			currentUser['symptoms'] = allUsers[i].symptoms;
			currentUser['centreID'] = allUsers[i].centreID;
			login = true;
			
			// navigate the user to specific pages with his/her position
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
	// invalid login
	if (login == false){
		alert('Invalid Username or Password !');
		window.location.href = "index.html";
	}
}

// capture login form data
function captureLoginFormData(){
	let formData = {};

	// get data from login form
	formData["username"] = document.getElementById("username").value;
	formData["password"] = document.getElementById("password").value;
	return formData;

}
//record Tester
function recordTester()
{
	event.preventDefault();
	//get value and store inro form data
	let formData={};
	formData['username']=document.getElementById('username').value;
	formData['password']=document.getElementById('password').value;
	formData['name']=document.getElementById('name').value;
	let record=true;
	//check is there same username in list
	for(let i=0;i<allUsers.length;i++)
	{
		//username found on user list
		if(formData['username']==allUsers[i].username)
		{
			record=false;
			//set error message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "alert");
			aNode.setAttribute("aria-label", "close");
			aNode.setAttribute("href", "#");
			aNode.innerHTML = "&times;";
			
			let strongNode = document.createElement("strong");
			let textNode = document.createTextNode("Cannot add ! " + allUsers[i].username + " (Username) has already existed.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
			divNode.appendChild(aNode);
			divNode.appendChild(strongNode);
			//append error message
			document.getElementById("error").appendChild(divNode);
			
		}break;
	}
	//user name not found on user list,record new user
	if (record==true)
	{
		// set the success message
		let aNode = document.createElement("a");
		aNode.setAttribute("class", "close");
		aNode.setAttribute("data-dismiss", "alert");
		aNode.setAttribute("aria-label", "close");
		aNode.setAttribute("href", "#");
		aNode.innerHTML = "&times;";
		
		let strongNode = document.createElement("strong");
		let textNode = document.createTextNode("New Tester(" + formDate['username'] + ") has been added successfully!");
		strongNode.appendChild(textNode);
		
		let divNode = document.createElement("div");
		divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
		divNode.appendChild(aNode);
		divNode.appendChild(strongNode);
		divNode.setAttribute("id", "errorMsg");
		// append the success message
		document.getElementById("error").appendChild(divNode);
	}
}

// register test centre form
function registerCentreFormSubmitted(){
	event.preventDefault();

	
	// get data from register centre form
	let formData = captureRegisterCentreFormData();
	let register = true;
	
	// remove the message created before
	if (document.getElementById("errorMsg") != null){
		document.getElementById("errorMsg").remove();
	}
	for (let i = 0; i < allCentres.length; i++){
		if (formData['centreName'] == allCentres[i].centreName){
			register = false; 
			
			// append the failure message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "alert");
			aNode.setAttribute("aria-label", "close");
			aNode.setAttribute("href", "#");
			aNode.innerHTML = "&times;";
			
			let strongNode = document.createElement("strong");
			let textNode = document.createTextNode("Cannot add ! " + allCentres[i].centreName + " (Test Centre) has already existed.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
			divNode.appendChild(aNode);
			divNode.appendChild(strongNode);

			divNode.setAttribute("id", "errorMsg");
			
			document.getElementById("error").appendChild(divNode);
		}
		break;
	}
	if (register == true){
		// create centre and push into allCentres
		createCentre = {
			centreID: currentCentreID++,
			centreName: formData['centreName'],
			address: formData['address'],
			id: currentUser['id']
		}
		allCentres.push(createCentre);
		
		// set centreID to currentUser
		currentUser['centreID'] = createCentre['centreID'];
		
		// append the success message
		let aNode = document.createElement("a");
		aNode.setAttribute("class", "close");
		aNode.setAttribute("data-dismiss", "alert");
		aNode.setAttribute("aria-label", "close");
		aNode.setAttribute("href", "#");
		aNode.innerHTML = "&times;";
		
		let strongNode = document.createElement("strong");
		let textNode = document.createTextNode("New test centre (" + createCentre['centreName'] + ") has been added successfully!");
		strongNode.appendChild(textNode);

		
		let divNode = document.createElement("div");
		divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
		divNode.appendChild(aNode);
		divNode.appendChild(strongNode);
		divNode.setAttribute("id", "errorMsg");
		
		document.getElementById("error").appendChild(divNode);
		
		
		// update the navigation details
		let nav = document.getElementsByTagName("a");
		nav[1].setAttribute("class", "nav-link text-secondary");
		nav[1].setAttribute("href", "#");
		nav[1].setAttribute("title", "You are owning a test centre currently !");

		nav[2].setAttribute("class", "nav-link");
		nav[2].setAttribute("href", "RecordTester.html");
		nav[2].removeAttribute("title");

		nav[3].setAttribute("class", "nav-link");
		nav[3].setAttribute("href", "ManageTestKit.html");
		nav[3].removeAttribute("title");
		
		btn1.setAttribute("class", "btn btn-dark");
		btn1.setAttribute("data-target", "#");
		btn1.setAttribute("title", "You cannot register more than one test centre !");
	}
	
}

function captureRegisterCentreFormData(){

	// get data from register centre form

	let formData = {};
	formData['centreName'] = document.getElementById('centreName').value;
	formData['address'] = document.getElementById('address').value;
	return formData;
}


// hide the modal once the register centre form submitted
$(document).ready(function() {
   $('#registerCentreForm').submit(function() {
		$("#registerCentreModal").modal("hide");
	});
});


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