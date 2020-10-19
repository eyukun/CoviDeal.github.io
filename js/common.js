/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/		

// current id
var currentCentreID = 3;
var currentUserID = 7;
var currentKitID = 6;

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
		username: 'adminadmin',
		password: 'adminadmin123',
		name: 'adminadmin',
		position: 'manager',
		patientType: 'null',
		symptoms: 'null',
		centreID: 2		
	},

	manager2: {
		id: 3,
		username: 'adminadminadmin',
		password: 'adminadminadmin123',
		name: 'adminadminadmin',
		position: 'manager',
		patientType: 'null',
		symptoms: 'null',
		centreID: 'null'
	},

	tester: {
		id: 4,
		username: 'tester',
		password: 'tester123',
		name: 'tester',
		position: 'tester',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1
	},

	patient: {
		id: 5,
		username: 'patient',
		password: 'patient123',
		name: 'patient',
		position: 'patient',
		patientType: 'Close Contact',
		symptoms: 'cough',
		centreID: 'null'
	},
	
	officer: {
		id: 6,
		username: 'officer',
		password: 'officer123',
		name: 'officer',
		position: 'officer',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1		
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

var createTetKit = {
	kitID: 'null',
	testName: 'null',
	availableStock: 'null',
	centreID: 'null'
}

// Centres initialised values
var centres = {
	kl: {
		centreID: 1,
		centreName: 'kl',
		address: '123, Jalan KL, KL',
		id: 1
	},
	
	pj: {
		centreID: 2,
		centreName: 'kl',
		address: '123, Jalan KL, KL',
		id: 2
	}
}


// Centres array
var allCentres = [];

// add in the centres
for (var centre in centres){
	allCentres.push(centres[centre]);
}

// Test kits initialised values
var testkits = {
	covid: {
		kitID: 1,
		testName: "covid",
		availableStock: 30,
		centreID: 1
	},
	fever: {
		kitID: 2,
		testName: "dyspnea",
		availableStock: 20,
		centreID: 1
	},
	cough: {
		kitID: 3,
		testName: "cough",
		availableStock: 40,
		centreID: 1
	},
	covid1: {
		kitID: 4,
		testName: "covid",
		availableStock: 30,
		centreID: 2
	},
	fever1: {
		kitID: 5,
		testName: "fever",
		availableStock: 30,
		centreID: 2
	}
}

// Test kit array
var allTestKits = [];

// add in the testKits
for (var testkit in testkits){
	allTestKits.push(testkits[testkit]);
}

// function to determine which function going
function common(action){
	switch(action){
		case 'login':
			login();
			break;
		case 'registerTestCentre':
			registerCentre();
			break;
		case 'recordTester':
			recordTester();
			break;
		case 'registerTestKit':
			registerTestKit();
			break;
		default:
			break;
	}
}

// login form
function login(){
	event.preventDefault();
	
	// get data from login form
	let formData = {};
	formData["username"] = document.getElementById("username").value;
	formData["password"] = document.getElementById("password").value;
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
			
			document.getElementById("error").appendChild(divNode);
			break;
		}
	}
	//user name not found on user list,record new user
	if (record==true)
	{
		//set error message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "success");
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
			
			document.getElementById("error").appendChild(divNode);
	}
}
//record Tester
function recordTester()
{
	event.preventDefault();
	//get value and store inro form data
	let formData={};
	if (document.getElementById("errorMsg") != null){
		document.getElementById("errorMsg").remove();
	}
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
			let textNode = document.createTextNode("Cannot add ! " + allUsers[i].username + " (Username) Has Already Existed.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
			divNode.appendChild(aNode);
			divNode.appendChild(strongNode);
			divNode.setAttribute("id", "errorMsg");
			//append error message
			document.getElementById("error").appendChild(divNode);
			//text set to empty
			document.getElementById('username').value='';
			document.getElementById('password').value='';
			document.getElementById('name').value='';
			break;
			
		}
	}
	if(record==true){
	//user name not found on user list,record new user
		// create user and push into allUser
		newUser= {
			id: currentUserID++,
			username: formData['username'],
			password:formData['password'],
			name:formData['name'],
			position:'tester',
			patientType: 'null',
			symptoms: 'null',
			centreID: currentUser['centreID'],
		}
		allUsers.push(newUser);
		
		// set centreID to currentUser
		currentUser['centreID'] = createCentre['centreID'];
		// set the success message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "alert");
			aNode.setAttribute("aria-label", "close");
			aNode.setAttribute("href", "#");
			aNode.innerHTML = "&times;";
			
			let strongNode = document.createElement("strong");
			let textNode = document.createTextNode("New Tester "+formData['username']+" (Username) Successfully Added.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
			divNode.appendChild(aNode);
			divNode.appendChild(strongNode);
			divNode.setAttribute("id", "errorMsg");
			//append error message
			document.getElementById("error").appendChild(divNode);
			//text set to empty
			document.getElementById('username').value='';
			document.getElementById('password').value='';
			document.getElementById('name').value='';
			
	}
}

// register a test centre
function registerCentre(){
	event.preventDefault();

	
	// get data from register centre form
	let formData = {};
	formData['centreName'] = document.getElementById('centreName').value;
	formData['address'] = document.getElementById('address').value;
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
			break;
		}
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

// register a test kit
function registerTestKit(){
	event.preventDefault();
	
	// get data from register test kit form
	let formData = {};
	formData["testName"] = document.getElementById("testName").value;
	formData["availableStock"] = parseInt(document.getElementById("availableStock").value);
	let register = true;
	
	// preset the centreID
	currentUser['centreID'] = 1;
	
	// remove the message created before
	if (document.getElementById("errorMsg") != null){
		document.getElementById("errorMsg").remove();
	}
	
	for (let i = 0; i < allTestKits.length; i++){
		if (allTestKits[i].testName === formData["testName"] && allTestKits[i].centreID === currentUser['centreID']){
			register = false;
			
			// append the failure message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "alert");
			aNode.setAttribute("aria-label", "close");
			aNode.setAttribute("href", "#");
			aNode.innerHTML = "&times;";
			
			let strongNode = document.createElement("strong");
			let textNode = document.createTextNode("Cannot add ! " + allTestKits[i].testName + " (Test Kit) has already existed.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
			divNode.appendChild(aNode);
			divNode.appendChild(strongNode);

			divNode.setAttribute("id", "errorMsg");
			
			document.getElementById("error").appendChild(divNode);
		}
	}
	if (register == true){
		
		// create test kit and push into allTestKits
		createTestKit = {
			kitID: currentKitID++,
			testName: formData['testName'],
			availableStock: formData['availableStock'],
			centreID: currentUser['centreID']
		}
		allTestKits.push(createTestKit);
		
		// insert the data into table
		let tabObj = document.getElementById('testkitTable');
		let tab = tabObj.getElementsByTagName("tbody")[0];
		
		let row = tab.insertRow(tab.length);
		
		let kitIDCell = row.insertCell(0);
		kitIDCell.innerHTML = createTestKit['kitID'];
		
		let testNameCell = row.insertCell(1);
		testNameCell.innerHTML = createTestKit['testName'];
		
		let stockCell = row.insertCell(2);
		stockCell.innerHTML = createTestKit['availableStock'];
		
		let centreIDCell = row.insertCell(3);
		centreIDCell.innerHTML = createTestKit['centreID'];
		
		let updateBtnCell = row.insertCell(4);
		updateBtnCell.innerHTML = '<button type="button" id="update" value="update" data-toggle="modal"' +
					  'data-target="#updateTestKitModal' + createTestKit['kitID'] + '"  class="btn btn-primary"> Update </button>';
		
		
		// update test kit modal
		let formEle = document.createElement('form');
		formEle.setAttribute('id', 'updateTestKitForm' + createTestKit['kitID']);
		
		formEle.innerHTML = '<div class="modal fade" id="updateTestKitModal' + createTestKit['kitID'] + '" tabindex="-1" role="dialog">' +
					'<div class="modal-dialog modal-dialog-centered" role="document">' +
						'<div class="modal-content">' +
							'<div class="modal-header">' +
								'<h5 class="modal-title" id="exampleModalLongTitle">Update Test Kit Stock</h5>' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
									'<span aria-hidden="true">&times;</span>' +
								'</button>' +
							'</div>' +
							'<div class="modal-body">' +
								'<div class="form-group row">' +
									'<label for="kitID" class="col-sm-6 col-lg-4 col-form-label"> Kit ID </label>' +
									'<div class="col-sm-12 col-lg-8">' +
										'<input type="text" class="form-control" id="updateKitID' + createTestKit['kitID'] + '" name="kitID" value="' + createTestKit['kitID'] + '" readonly ><br>' +
									'</div>' +
								
									'<label for="testName" class="col-sm-6 col-lg-4 col-form-label"> Test Kit Name </label>' +
									'<div class="col-sm-12 col-lg-8">' +
										'<input type="text" class="form-control" id="updateTestName' + createTestKit['kitID'] + '" name="testName" value="' + createTestKit['testName'] + '" readonly><br>' +
									'</div>' +
								
									'<label for="Income Stock" class="col-sm-6 col-lg-4 col-form-label"> Income Stock </label>' +
									'<div class="col-sm-12 col-lg-8">' +
										'<input type="number" min="1" pattern="^[1-9][0-9]*$ class="form-control" name="stock" id="incomeStock' + createTestKit['kitID'] + '" required>' +
									'</div>' +
								'</div>' +
							'</div>' +
						
							'<div class="modal-footer">' +
								'<input name="action_name" id="action" value="updateTestKit" hidden>' +
								'<input type="submit" class="btn btn-primary" name="submit" value="Update">' +
							'</div>' +
						'</div>' +
					'</div>' +
				'</div>';

			// update function
			formEle.onsubmit = 
			function (){
				event.preventDefault();
				
				// get the income stock of the selected test kit
				let formData = {};
				formData["incomeStock"] = parseInt(document.getElementById("incomeStock" + createTestKit['kitID']).value);
				formData["updateTestName"] = document.getElementById("updateTestName" + createTestKit['kitID']).value;
				formData["updateKitID"] = document.getElementById("updateKitID" + createTestKit['kitID']).value;
				console.log(formData);
				let update = false;
				
				// remove the message created before
				if (document.getElementById("errorMsg") != null){
					document.getElementById("errorMsg").remove();
				}
				
				for (let i = 0; i < allTestKits.length; i++){
					if (allTestKits[i].kitID == formData["updateKitID"] && allTestKits[i].centreID == currentUser['centreID']){
						update = true;
						// update total stock
						allTestKits[i].availableStock += formData["incomeStock"];
						// update table
						stockCell.innerHTML = allTestKits[i].availableStock;
						// append the success message
						let aNode = document.createElement("a");
						aNode.setAttribute("class", "close");
						aNode.setAttribute("data-dismiss", "alert");
						aNode.setAttribute("aria-label", "close");
						aNode.setAttribute("href", "#");
						aNode.innerHTML = "&times;";
						
						let strongNode = document.createElement("strong");
						let textNode = document.createTextNode("Update Successfully ! (" + allTestKits[i].testName + ") has been updated successfully!");
						strongNode.appendChild(textNode);
						
						let divNode = document.createElement("div");
						divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
						divNode.appendChild(aNode);
						divNode.appendChild(strongNode);
						divNode.setAttribute("id", "errorMsg");
						
						document.getElementById("error").appendChild(divNode);
						
					}
				}
				// should not possible to have this condition
				if (update == false){
					
					// append the failure message
					let aNode = document.createElement("a");
					aNode.setAttribute("class", "close");
					aNode.setAttribute("data-dismiss", "alert");
					aNode.setAttribute("aria-label", "close");
					aNode.setAttribute("href", "#");
					aNode.innerHTML = "&times;";
					
					let strongNode = document.createElement("strong");
					let textNode = document.createTextNode("Update Failure ! " + formData["updateTestName"] + " (Test Kit) is not found.");
					strongNode.appendChild(textNode);
								
					let divNode = document.createElement("div");
					divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
					divNode.appendChild(aNode);
					divNode.appendChild(strongNode);

					divNode.setAttribute("id", "errorMsg");
					
					document.getElementById("error").appendChild(divNode);
					
				}
				
			}

			document.body.appendChild(formEle);
			
			// hide the modal once the form submitted
			$(document).ready(function() {									
				 $('#updateTestKitForm' + createTestKit['kitID']).submit(function() {
					$("#updateTestKitModal" + createTestKit['kitID']).modal("hide");
				});
			});
					  
		// append the success message
		let aNode = document.createElement("a");
		aNode.setAttribute("class", "close");
		aNode.setAttribute("data-dismiss", "alert");
		aNode.setAttribute("aria-label", "close");
		aNode.setAttribute("href", "#");
		aNode.innerHTML = "&times;";
		
		let strongNode = document.createElement("strong");
		let textNode = document.createTextNode("New test centre (" + createTestKit['testName'] + ") has been added successfully!");
		strongNode.appendChild(textNode);
		
		let divNode = document.createElement("div");
		divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
		divNode.appendChild(aNode);
		divNode.appendChild(strongNode);
		divNode.setAttribute("id", "errorMsg");
		
		document.getElementById("error").appendChild(divNode);
		
	}
}



// hide the modal once the form submitted
$(document).ready(function() {
   $('#registerCentreForm').submit(function() {
		$("#registerCentreModal").modal("hide");
	});
	 $('#registerTestKitForm').submit(function() {
		$("#registerTestKitModal").modal("hide");
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