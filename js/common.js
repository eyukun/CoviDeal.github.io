/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/		

// Users initialised values
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

// current user info
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

// Centres initialised values
var centres = {
	kl: {
		centreID: '1',
		centreName: 'kl',
		address: '123, Jalan KL, KL'
	}
}
var centreID = 3;

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
		default:
			alert(action);
			break;
	}
}

// login form
function loginFormSubmitted(){
	event.preventDefault();
	let formData = captureLoginFormData();
	let login = false;
	for (let i = 0; i < allUsers.length; i++){
		if (formData['username'] == allUsers[i].username && formData['password'] == allUsers[i].password){
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

// capture login form data
function captureLoginFormData(){
	let formData = {};
	formData["username"] = document.getElementById("username").value;
	formData["password"] = document.getElementById("password").value;
	return formData;
}



/*
// register test centre function
function registerTestCentre(){

	//get the data from registerTestCentre.php
	//prevent database error due to user's input
	$centreName = $_POST['centreName'];
	$address = $_POST['address'];
	$sql = "SELECT * FROM testcentre WHERE centreName='$centreName'";
	$id = $_SESSION["id"];
	$centre = db_find($sql);


	// if have result for this test centre
	if($centre != null)
	{
		// print messages in interface file
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Cannot add! ' . $centreName . ' (Test Centre) has already existed.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/registerTestCentre.php'; </script>";
	}
	// new test centre
	else{
		// if have registered test centre for this manager
		// this happen after a manager register successfully and wants to register one more
		if ($_SESSION['centreID'] != null){
			$error = '<div class="alert alert-danger alert-dismissible">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong> You are owning a test centre currently ! </strong></div>';
				$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/RecordTester.php'; </script>";
		}
		else {
			//add the test centre
			$insert = "insert into testcentre(centreName, address, id) values ('$centreName', '$address', '$id');";
			$centre = db_result($insert);
			if ($centre == true){
				$sql1 = "SELECT * FROM testcentre WHERE centreName='$centreName'";
				$centre = db_find($sql1);
				$centreID = $centre->centreID;
				
				// update manager's centre id
				$sql1 = "UPDATE user SET centreID='$centreID' WHERE id='$id'";
				$user = db_result($sql1);
				if ($user != null)	{
					$error = '<div class="alert alert-success alert-dismissible fade show">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					<strong>New test centre ('.$centreName.') has been added successfully!</strong></div>';
					$_SESSION['error'] = $error;
					$_SESSION['centreID'] = $centreID;
					echo "<script type='text/javascript'> window.location = '/code/registerTestCentre.php'; </script>";
				}
			}
			else {
				$error = '<div class="alert alert-danger alert-dismissible fade show">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong> Test Centre ('.$centreName.') added unsuccessfully!</strong></div>';
				$_SESSION['error'] = $error;
				echo "<script type='text/javascript'> window.location = '/code/registerTestCentre.php'; </script>";
			}
		}
	}
}
*/

// register test centre form
function registerCentreFormSubmitted(){
	event.preventDefault();
	let formData = captureRegisterCentreFormData();
	let register = true;
	for (let i = 0; i < allCentres.length; i++){
		if (formData['centreName'] == allCentres[i].centreName){
			register = false;
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
			
			document.getElementById("error").appendChild(divNode);
		}
		break;
	}
	if (register == true){
		
	}
	
}

function captureRegisterCentreFormData(){
	let formData = {};
	formData['centreName'] = document.getElementById('centreName').value;
	formData['address'] = document.getElementById('address').value;
	return formData;
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