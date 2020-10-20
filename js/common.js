/**
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
**/		

// current id
var currentCentreID = 3;
var currentUserID = 10;
var currentKitID = 6;
var currentTestID=1;

// Users initialised values
var users = {
	manager: {
		id: 1,
		username: 'admin',
		password: 'admin123',
		name: 'admin',
		nation:'null',
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
		nation:'null',
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
		nation:'null',
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
		nation:'null',
		position: 'tester',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1
	},

	patient: {
		id: 5,
		username: 'jeff',
		password: 'jeff1234',
		name: 'jeff',
		nation:'local',
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
		nation:'null',
		position: 'officer',
		patientType: 'null',
		symptoms: 'null',
		centreID: 1		
	},
	patient1: {
		id: 7,
		username: 'kobe',
		password: 'kobe1234',
		name: 'kobe',
		nation:'local',
		position: 'patient',
		patientType: 'Close Contact',
		symptoms: 'cough',
		centreID: 'null'
	},
	patient2: {
		id: 8,
		username: 'james',
		password: 'james1234',
		name: 'james',
		nation:'International',
		position: 'patient',
		patientType: 'Returnee',
		symptoms: 'fever',
		centreID: 'null'
	},
	patient3: {
		id: 9,
		username: 'mike',
		password: 'mike1234',
		name: 'mike',
		nation:'International',
		position: 'patient',
		patientType: 'Infected',
		symptoms: 'fever',
		centreID: 'null'
	},
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

// create test kit
var createTestKit = {
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

//Test array
var allTest=[];

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
		case 'registerPatient':
			registerPatient();
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
				formData["updateTestName"] = document.getElementById("updateTestName" + createTestKit['kitID']).value;
				formData["updateKitID"] = document.getElementById("updateKitID" + createTestKit['kitID']).value;
				if (parseInt(document.getElementById("incomeStock" + createTestKit['kitID']).value) != null){
					formData["incomeStock"] = parseInt(document.getElementById("incomeStock" + createTestKit['kitID']).value);
				}
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


// register a patient and create a new test
function registerPatient(){
	event.preventDefault();
	
	// get data from register patient form
	let formData = {};
	formData["username"] = document.getElementById("username").value;
	formData["password"] = document.getElementById("password").value;
	formData["name"] = document.getElementById("name").value;
	formData["nation"] = document.getElementById("nation").value;
	formData["patientType"] = document.getElementById("patientType").value;
	formData["symptoms"] = document.getElementById("symptoms").value;
	if (parseInt(document.getElementById("kitID").value) != null){
		formData["kitID"] = parseInt(document.getElementById("kitID").value);
	}
	let register = true;
	let check=false;
	// preset the centreID
	currentUser['centreID'] = 1;
	
	// remove the message created before
	if (document.getElementById("errorMsg") != null){
		document.getElementById("errorMsg").remove();
	}
	
	for (let i = 0; i < allUsers.length; i++){
		if (allUsers[i].username === formData["username"]){
			register = false;
			
			// append the failure message
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
			divNode.setAttribute("id", "errorMsg");
			document.getElementById("error").appendChild(divNode);
		}
	}
	for(let i=0;i<allTestKits.length;i++)
	{
		if(allTestKits[i].kitID==formData["kitID"])
		{
			check=true;
		}
	}
	
	if (register == true&&check==true){
		
			// create patient and push into allTestKits
			createUser = {
			id: currentUserID++,
			username: formData["username"],
			password: formData["password"],
			name: formData["name"],
			nation:formData["nation"],
			position: formData["position"],
			patientType: formData["patientType"],
			symptoms: formData["symptoms"],
			centreID: 1		
			}
			allUsers.push(createUser);
			
			var d=new Date();
			var newtest = {
				testID:currentTestID++,
				testDate:d,
				result:'pending',
				resultDate:'pending',
				status:'pending',
				id:createUser.id,
				kitID:formData['kitID'],
			}
			allTest.push(newtest);
		
			// insert the data into table
			let tabObj = document.getElementById('patientTable');
			let tab = tabObj.getElementsByTagName("tbody")[0];
			let row = tab.insertRow(tab.length);
			let idCell = row.insertCell(0);
			idCell.innerHTML = createUser.id;
			let usernameCell = row.insertCell(1);
			usernameCell.innerHTML = createUser.username;
			let nameCell = row.insertCell(2);
			nameCell.innerHTML =  createUser.availableStock;
			let nationCell = row.insertCell(3);
			nationCell.innerHTML =  createUser.nation;
			let patientTypeCell = row.insertCell(4);
			patientTypeCell.innerHTML =  createUser.patientType;
			let symptomsCell = row.insertCell(5);
			symptomsCell.innerHTML =  createUser.symptoms;
			// update patient button
			let updateBtnCell = row.insertCell(6);
			updateBtnCell.innerHTML = '<button type="button" id="update" value="update" data-toggle="modal"' +
				'data-target="#updatePatientModal' + createUser.id + '"  class="btn btn-primary"> Update </button>';
							
			<!-- Update Patient Modal !--> 
			let formEle = document.createElement('form');
			formEle.setAttribute('id', 'updatePatientForm' +  createUser.id );
							
			formEle.innerHTML = '<div class="modal fade" id="updatePatientModal' + createUser.id  + '" tabindex="-1" role="dialog">' +
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
						'<label for="id" class="col-sm-6 col-lg-4 col-form-label"> id </label>' +
							'<div class="col-sm-12 col-lg-8">' +
															'<input type="text" class="form-control" id="updateID' + createUser.id  + '" name="id" value="' +  createUser.id  + '" readonly ><br>' +
														'</div>' +
													
														'<label for="username" class="col-sm-6 col-lg-4 col-form-label"> Username </label>' +
														'<div class="col-sm-12 col-lg-8">' +
															'<input type="text" class="form-control" id="updateUsername' + createUser.username + '" name="userame" value="' +  createUser.username + '" readonly><br>' +
														'</div>' +
													
														'<label for="patientType" class="col-sm-6 col-lg-4 col-form-label"> Patient Type </label>' +
														'<div class="col-sm-12 col-lg-8">' +
															'<select name="patientType" id="patientType'+createUser.id +'" class="form-control">'+
																'<option value="Returnee">Returnee</option>'+
																'<option value="Quarantine">Quarantine</option>'+
																'<option value="Close Contact">Close Contact</option>'+
																'<option value="Infected">Infected</option>'+
																'<option value="Suspected">Suspected</option>'+
															'</select><br>'+
														'</div>' +
														
														'<label for="symptoms" class="col-sm-6 col-lg-4 col-form-label"> Symptoms </label>' +
														'<div class="col-sm-12 col-lg-8">' +
															'<input type="text"  class="form-control" name="symptoms" id="symptoms'+createUser.id +'" required><br>' +
														'</div>' +
														
														'<label for="kitID" class="col-sm-6 col-lg-4 col-form-label"> KITID </label>' +
															'<div class="col-sm-12 col-lg-8">' +
															'<input type="number" min="1" pattern="^[1-9][0-9]*$ class="form-control" name="kitID" id="kitID'+createUser.id +'" required>' +
														'</div>' +
													'</div>' +
												'</div>' +
											
												'<div class="modal-footer">' +
													'<input name="action_name" id="action" value="updatePatient" hidden>' +
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
									formData["patientType"] =document.getElementById("patientType" + allUsers[i].id).value;
									formData["symptoms"] = document.getElementById("symptoms" + allUsers[i].id).value;
									formData["updateID"] = document.getElementById("updateID" + allUsers[i].id).value;
									if (parseInt(document.getElementById("kitID").value) != null){
										formData["kitID"] = parseInt(document.getElementById("kitID"+allUsers[i].id).value);
									}
									let update = false;
									
									// remove the message created before
									if (document.getElementById("errorMsg") != null){
										document.getElementById("errorMsg").remove();
									}
									
									for (let i = 0; i < allTestKits.length; i++){
										if(allTestKits[i].kitID==formData["kitID"])
										{
											for (let i = 0; i < allUsers.length; i++){
											if(allUsers[i].id==formData["updateID"])
												{
												update = true;
											allUsers[i].patientType=formData["patientType"];
											allUsers[i].symptoms=formData["symptoms"];
											
											// update stock
											for (let i = 0; i < allTestKits.length; i++){
												if(allTestKits[i].kitID==formData["kitID"])
												{
													allTestKits[i].availableStock--;
												}
											}
											
											// create new test and push to all test
											var d=new Date();
											var newtest = {
												testID:currentTestID++,
												testDate:d,
												result:'pending',
												resultDate:'pending',
												status:'pending',
												id:currentUser['id'],
												kitID:formData['kitID'],
											}
											allTest.push(newtest);
											// update table
											idCell.innerHTML = allUsers[i].id;
											usernameCell.innerHTML = allUsers[i].usename;
											nameCell.innerHTML = allUsers[i].name;
											nationCell.innerHTML = allUsers[i].nation;
											patientTypeCell.innerHTML = allUsers[i].patientType;
											symptomsCell.innerHTML = allUsers[i].symptoms;
											// append the success message
											let aNode = document.createElement("a");
											aNode.setAttribute("class", "close");
											aNode.setAttribute("data-dismiss", "alert");
											aNode.setAttribute("aria-label", "close");
											aNode.setAttribute("href", "#");
											aNode.innerHTML = "&times;";
											
											let strongNode = document.createElement("strong");
											let textNode = document.createTextNode("Update Successfully ! Username(" + allUsers[i].username + ") and Test has been updated successfully!");
											currentTestID++;
											strongNode.appendChild(textNode);
											
											let divNode = document.createElement("div");
											divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
											divNode.appendChild(aNode);
											divNode.appendChild(strongNode);
											divNode.setAttribute("id", "errorMsg");
											
											document.getElementById("error").appendChild(divNode);
											
												}
											}
											
									}
									}
									
									
									// KitID Not found
									if (update == false){
										
										// append the failure message
										let aNode = document.createElement("a");
										aNode.setAttribute("class", "close");
										aNode.setAttribute("data-dismiss", "alert");
										aNode.setAttribute("aria-label", "close");
										aNode.setAttribute("href", "#");
										aNode.innerHTML = "&times;";
										
										let strongNode = document.createElement("strong");
										let textNode = document.createTextNode("Update Failure ! " + formData["kitID"] + " (KIT ID) is not found.");
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
				 $('#updatePatientForm' + createUser['id']).submit(function() {
					$("#updatePatientModal" + createUser['id']).modal("hide");
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
		let textNode = document.createTextNode("New Patient Username(" + createUser['username'] + ") and New Test TestID("+currentTestID+") has been added successfully!");
		strongNode.appendChild(textNode);
		
		let divNode = document.createElement("div");
		divNode.setAttribute("class", "alert alert-success alert-dismissible fade show");
		divNode.appendChild(aNode);
		divNode.appendChild(strongNode);
		divNode.setAttribute("id", "errorMsg");
		
		document.getElementById("error").appendChild(divNode);
		
	
		
	}
	if(check==false)
		{
			// append the failure message
			let aNode = document.createElement("a");
			aNode.setAttribute("class", "close");
			aNode.setAttribute("data-dismiss", "alert");
			aNode.setAttribute("aria-label", "close");
			aNode.setAttribute("href", "#");
			aNode.innerHTML = "&times;";
			
			let strongNode = document.createElement("strong");
			let textNode = document.createTextNode("Cannot add ! "+formData["kitID"]+"(KitID) Not Found.");
			strongNode.appendChild(textNode);
						
			let divNode = document.createElement("div");
			divNode.setAttribute("class", "alert alert-danger alert-dismissible fade show");
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
	$('#registerPatientForm').submit(function() {
		$("#registerPatientModal").modal("hide");
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