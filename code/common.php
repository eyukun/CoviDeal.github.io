<!--
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
!-->
<?php
session_start();
// echo "Good Connection!<br>";

// $k = "";
// foreach ($_POST as $key => $value) {
//    $k .= $key ." : ". $value. '\n';
// }
// if($k != ""){
// 	echo '<script> console.info("Session: \n' . $k . '") </script>';
// }


// To decide which function
if(isset($_POST['action_name'])) {
	if (isset($_SESSION['error'])){
		unset($_SESSION['error']);
	}
	
	// determine which form
	switch ($_POST['action_name']) {
		// login function
		case 'login':
			login();
			break;
		
		// register test centre function
		case 'registerTestCentre':
			registerTestCentre();
			break;
			
		// update test kit function
		case 'updateTestKit':
			updateTestKit();
			break;
			
		// add test kit function
		case 'addTestKit':
			addTestKit();
			break;
		case'recordPatient':
			recordPatient();
			break;
		case'record_tester':
			record_tester();
			break;
		case'updatePatient':
			updatePatient();
			break;
			
		// update test result function
		case 'updateTest':
			updateTest();
			break;

		// others...
		default:
			# code...
			break;
	}

  	
}

// login function
function login() {

	// get username and password from index.php
	$sql = "SELECT * FROM user where username = '" . $_POST['username'] . "' and password = '" . $_POST['password'] . "'";
    $user = db_find($sql);
		
    if($user != null){ //authentication success, save in session

		$_SESSION['id']     = $user->id;
		$_SESSION['username']    = $user->username;
		$_SESSION['user_name']   = $user->name;
		$_SESSION['position'] = $user->position;
		$_SESSION['patient_type'] = $user->patientType;
		$_SESSION['centreID'] = $user->centreID;
		
		// if is a patient, centreID will be null
		// if the manager hasn't register a centre yet, centreID will be null too
		if ($_SESSION['centreID'] != null){
			$sql1 = "SELECT * FROM testcentre where centreID = '". $_SESSION['centreID']."'";
			$centre = db_find($sql1);
			$_SESSION['centreName'] = $centre->centreName;
			
			$sql2 = "SELECt * FROM user where id = (SELECT id FROM testcentre where centreID = '".$_SESSION['centreID']."')";
			$owner = db_find($sql2);
			$_SESSION['centreOwner'] = $owner->name;
		}

		// determine position
		switch ($_SESSION['position']) {
			case 'tester': // tester
				header("Location:FindPatient.php?position=tester");
    			echo "<script> window.location.assign('FindPatient.php'); </script>";
				break;
			case 'manager': // manager
				if ($_SESSION['centreID'] == null){
					header("Location:RegisterTestCentre.php?position=manager");
					echo "<script> window.location.assign('RegisterTestCentre.php'); </script>";
				}
				else {
					header("Location:RecordTester.php?position=manager");
					echo "<script> window.location.assign('RecordTester.php'); </script>";
				}
				break;
			case 'officer': // officer
				header("Location:GenerateTestReport.php?position=officer");
				echo "<script> window.location.assign('GenerateTestReport.php'); </script>";
				break;
			case 'patient': // patient
				header("Location:ViewTestingHistory.php?position=patient");
				echo "<script> window.location.assign('ViewTestingHistory.php'); </script>";
				break;
				
			default: // no well defined user
				header("Location:index.php?error=usernotdefined");
    			echo "<script> window.location.assign('Index.php'); </script>";
				break;
		}


    }else{ //fail to login
		header("Location:index.php?error=invalidlogin");
    	echo "<script> window.location.assign('index.php'); </script>";
    }
	
}

// for select and fetch an object
function db_find($sql){

	$servername = "localhost";
	$username   = "root";
	$password   = "";
	$dbname     = "covideal";
	
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	
	$result = $conn->query($sql);

	return $result->fetch_object();
}

// for result of insert, update an existing object
function db_result($sql){
	$servername = "localhost";
	$username   = "root";
	$password   = "";
	$dbname     = "covideal";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	
	$result = $conn->query($sql);
	return $result;
}
//For return id after insert object
function db_insert($sql){

	$servername = "127.0.0.1";
	$username   = "root";
	$password   = "";
	$dbname     = "covideal";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	
	$result = $conn->query($sql);

	return $conn->insert_id;
}


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
					$_SESSION["centreName"] = $centreName;
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

// update test kit stock function
function updateTestKit(){
	
	// get kitID from update form
	$kitID = $_POST['kitID'];
	$testKitName = $_POST['testKitName'];
	$sql = "SELECT * FROM testkit WHERE kitID='$kitID' AND centreID='".$_SESSION['centreID']."'" ;
	$testkit = db_find($sql);
	
	// if the test kit not found
	if($testkit == null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Error occurs! ' . $testKitName . ' (Test Kit) is not found.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/ManageTestKit.php'; </script>";
	}
	
	// if the test kit found
	else {
		// update the availableStock of test kit
		$availableStock = $testkit->availableStock;
		$updatedStock = $_POST['stock'] + $availableStock;
		$update = "UPDATE testkit SET availableStock='$updatedStock' WHERE kitID='$kitID' 
		AND centreID='".$_SESSION['centreID']."'";
		$testkit = db_result($update);
		// update success
		if ($testkit != null){
			$error = '<div class="alert alert-success alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong>Test Kit ('.$testKitName.') Stock has been updated successfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/ManageTestKit.php'; </script>";											
		}
		// update failed
		else {
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> Test Kit ('.$testKitName.') updated unsuccessfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/ManageTestKit.php'; </script>";
		}
	}
}

// add test kit function
function addTestKit(){

	// get information from form to add a new test kit
	$testKitName = $_POST['testKitName'];
	$availableStock = $_POST['stock'];
	$centreID = $_SESSION["centreID"];
	$sql = "SELECT * FROM testkit WHERE testkitname='$testKitName' AND centreID='$centreID'";
	$testkit = db_find($sql);


	// if have result for this test kit
	if($testkit != null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Cannot add! ' . $testKitName . ' (Test Kit) has already existed.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/manageTestKit.php'; </script>";
	}
	// new test kit
	else{
		//add the test kit
		$insert = "insert into testkit(testKitName, availableStock, centreID) values ('$testKitName', '$availableStock', '$centreID');";
		$testkit = db_result($insert);
		// register success
		if ($testkit == true){
				$error = '<div class="alert alert-success alert-dismissible fade show">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>New test kit ('.$testKitName.') has been added successfully!</strong></div>';
				$_SESSION['error'] = $error;
				echo "<script type='text/javascript'> window.location = '/code/manageTestKit.php'; </script>";
		}
		// register fail
		else {
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> Test Kit ('.$testKitName.') added unsuccessfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/manageTestKit.php'; </script>";
		}
	}
}
//to update patient data by using existing data and record new test
function updatePatient()
{
	$username=$_POST['username'];
	$name=$_POST['name'];
	$id = $_POST['id'];
	$sql = "SELECT * FROM user WHERE id='$id'" ;
	$user = db_find($sql);
	
	if($user == null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Error occurs! ' . $id . ' (Patient) is not found.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/FindPatient.php'; </script>";
	}
	else {
		//update patient
		$patientType= $_POST['patientType'];
		$symptoms=$_POST['symptoms'];
		$update1 = "UPDATE user SET patientType='$patientType', symptoms='$symptoms' WHERE id='$id'";
		$user = db_result($update1);
		
		//create new test
		$id = $_POST['id'];
		$kitID=$_POST['kitID'];
		$create_test_id_sql = "insert into test (`testDate`, `result`,`resultDate`, `status`, `id`, `kitID`,`patientName`,`testerName`) "
								." values (curdate(), 'pending', 'pending', 'pending', '" . $id . "', '" .$kitID. "','" .$name. "','" .$_SESSION['user_name']. "') ";
		
		
		//send testid to next page
		$new_test_id = db_insert($create_test_id_sql);
		$updateStock = "UPDATE testkit SET availableStock=availableStock-1 WHERE kitID='$kitID'";
		$res1 = db_result($updateStock);
		if ($res1 == null){
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> Stock not enough !</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/FindPatient.php'; </script>";
		}
		else {
			$error = '<div class="alert alert-success alert-dismissible fade show">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>New Test ('.$new_test_id.') has been added successfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/RecordNewTest.php?test_id=".$new_test_id."'; </script>";											
		}
	}
}
//to record a tester with existing data into database and record new test
function record_tester()
{

	$username = $_POST['username'];
	$password = $_POST['password'];
	$name = $_POST['name'];
	$centreID = $_SESSION["centreID"];
	
	$sql = "SELECT * FROM user WHERE username='$username'";
	$user = db_find($sql);


	// if have result for this patient
	if($user != null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Cannot add! ' . $username . ' (username) has already existed.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/RecordTester.php'; </script>";
	}
	else{
		//add the patient
		$insert = "insert into user(username, password, name,position,centreID) values ('$username', '$password', '$name','tester','$centreID');";
		$user = db_result($insert);
		if ($user == true){
			$error = '<div class="alert alert-success alert-dismissible fade show">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong>New Tester ('.$username.') has been added successfully!</strong></div>';
				$_SESSION['error'] = $error;
				echo "<script type='text/javascript'> window.location = '/code/RecordTester.php'; </script>";
		}
		else {
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> User ('.$username.') added unsuccessfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/RecordTester.php'; </script>";
		}
	}

}
//to insert a patient with existing data into database
function recordPatient(){
	
	$username = $_POST['username'];
	$password = $_POST['password'];
	$name = $_POST['name'];
	$nation=$_POST['nation'];
	$patientType = $_POST['patientType'];
	$symptoms = $_POST['symptoms'];
	$centreID = $_SESSION["centreID"];
	
	$sql = "SELECT * FROM user WHERE username='$username'";
	$user = db_find($sql);


	// if have result for this patient
	if($user != null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Cannot add! ' . $username . ' (username) has already existed.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/FindPatient.php'; </script>";
	}
	else{
		//add the patient
		$insert = "insert into user(username, password, name,nation,position,patientType,symptoms) values ('$username', '$password', '$name','$nation','patient','$patientType','$symptoms');";
		$id = db_insert($insert);
		
		// if patient created success
		if ($id != null){
			$kitID=$_POST['kitID'];
			$updateStock = "UPDATE testkit SET availableStock=availableStock-1 WHERE kitID='$kitID'";
			$res1 = db_result($updateStock);
			if ($res1 == null){
				$error = '<div class="alert alert-danger alert-dismissible fade show">
				<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
				<strong> Stock not enough !</strong></div>';
				$_SESSION['error'] = $error;
				echo "<script type='text/javascript'> window.location = '/code/FindPatient.php'; </script>";
			}
			else {
				$create_test_id_sql = "insert into test (`testDate`, `result`,`resultDate`, `status`, `id`, `kitID`,`patientName`,`testerName`) "
										." values (curdate(), 'pending', 'pending', 'pending', '" . $id . "', '" .$kitID. "','" .$name. "','" .$_SESSION['user_name']. "') ";
				
				//send testid to next page
				$new_test_id = db_insert($create_test_id_sql);
				
				$error = '<div class="alert alert-success alert-dismissible fade show">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
					<strong>New Test ('.$new_test_id.') has been added successfully!</strong></div>';
					$_SESSION['error'] = $error;
					echo "<script type='text/javascript'> window.location = '/code/RecordNewTest.php?test_id=".$new_test_id."'; </script>";
			}
		}
		else {
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> User ('.$username.') added unsuccessfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/FindPatient.php'; </script>";
		}
	}
}

// update test function
function updateTest(){
	
	// get kitID from update form
	$testID = $_POST['testID'];
	$sql = "SELECT * FROM test WHERE testID='$testID'";
	$test = db_find($sql);
	
	// if the test not found
	if($test == null)
	{
		$error = '<div class="alert alert-danger alert-dismissible fade show">
		<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
		<strong>Error occurs! ' . $testID . ' (Test) is not found.</strong></div>';
		$_SESSION['error'] = $error;
		echo "<script type='text/javascript'> window.location = '/code/UpdateTestResult.php'; </script>";
	}
	
	// if the test found
	else {
		// update the status of test
		$updatedResult = $_POST['result'];
		$update = "UPDATE test SET result='$updatedResult', resultDate=now(), status='complete' WHERE testID='$testID'";
		$test = db_result($update);
		// update success
		if ($test != null){
			$error = '<div class="alert alert-success alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong>Test Result('.$testID.') has been updated successfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/TestResult.php?test_id=".$testID."'; </script>";											
		}
		// update failed
		else {
			$error = '<div class="alert alert-danger alert-dismissible fade show">
			<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			<strong> Test Result ('.$testID.') updated unsuccessfully!</strong></div>';
			$_SESSION['error'] = $error;
			echo "<script type='text/javascript'> window.location = '/code/UpdateTestResult.php'; </script>";
		}
	}
}

?>
<!--
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
!-->