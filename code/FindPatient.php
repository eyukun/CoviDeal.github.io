<!--
Student Name: Eyu Kun
Student ID: B1900083
!-->
<?php
	require_once("common.php");
?>
<!DOCTYPE html>
 <html lang="en">
 <head>
   
	 <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<!-- css source !-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" href="css/findPatient.css" type="text/css" media="screen">
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
    <title>CoviDeal - The Covid-19 Test Information System</title>
	
	<!-- javascript source !-->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/ManageTestKit.js"></script>
	
	<style>
		.dropdown-toggle {
			padding-top: 0px;
			padding-bottom: 0px;
		}		
	
	</style>

 </head>

 <body>
	<!-- body !-->
   <!--navigation-->
 	<nav class="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
		   <ul class="nav nav-pills" role="tablist">
			 <li class="nav-item pill-1">
				<a class="navbar-brand" style="font-family:cursive; color: white;">CoviDeal</a>
			 </li>
			 <li>
				<!-- User profile icon !-->
			   <div class="dropdown">
					<button type="button" class="navbar-brand btn btn-dark dropdown-toggle" data-toggle="dropdown">
					   <a class="navbar-brand" href="javascript:void(0);">
					   <i class="fa fa-fw fa-user-circle" onclick="dropdown(this)" ></i>
					   Hi, <?php echo $_SESSION["username"]; ?>
					   </a>
				   </button>
				   <!-- Dropdown options !-->
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#"> Username: <?php echo $_SESSION["username"]; ?> </a>
						<a class="dropdown-item" href="#"> Position: <?php echo $_SESSION["position"]; ?> </a>
						<a class="dropdown-item" href="#"> Name: <?php echo $_SESSION["user_name"]; ?> </a>
						<a class="dropdown-item" href="#"> Centre ID: <?php echo $_SESSION["centreID"]; ?> </a>
						<a class="dropdown-item" href="#"> Centre Name: <?php echo $_SESSION["centreName"]; ?> </a>
					</div>
				</div>
			</li>
			<li class="nav-item pill-2">
				<a class="nav-link active" href="FindPatient.php" style ="color:white">Record New Test</a>
			</li>
		
			<li class="nav-item pill-3">
				<a class="nav-link" href="UpdateTestResult.php"> Update Test Result</a>
			</li>
		   </ul>
				
			<ul class="navbar-nav mr-auto">
		   </ul>	
		   
		   <a class="navbar-brand" href="index.php" style="font-family:cursive; color: white;"><i class="fa fa-sign-out"></i>Sign out</a>
		  
		</div>
   </nav>
   <br>
   <br>
		<div class = "container">
		   <!-- container !-->
		   <div class="row" id="box">
			<div class="col-lg-12">
				<div class="jumbotron">
					  <h1 class="display-4">Record New Test</h1>
					  <hr class="my-4">
					   <!-- error message here !-->
						<div class="form-group">
							<div class="col-lg-12">
								<?php
								if (isset($_SESSION['error'])) {
									echo $_SESSION['error'];
									unset($_SESSION['error']);} ?>
							</div>
						</div>	
					  <p style="font-size:20px;"> Update Or Register For A User And Record New Test For The Patient</p><br>
						<p class="lead">
						  <!-- register button to register a new Patient !-->
						  <button id="btn1" type="button" class="btn btn-success" data-toggle="modal"
						  data-target="#recordPatientModal"> Register </button>
						</p>
					 </div>
				</div>
			</div>
			<br><br>
		 <hr>
		 
		
		<br>
		
	<div class="col-lg-12">
        <div id="box">
			<!-- search bar !-->
			 <div class="row align-items-center">
				<div class="mx-auto">
					 <form class="form-inline">
						<i class="fa fa-search" aria-hidden="true" 
						style="margin-right: 6px;"></i>
				   <input class="form-control" style="width: 400px;"
				   id="filter" type="number"
				   placeholder="Search by Patient ID" onkeyup="searchPatient()">
				 </form>	
			 </div>
			</div>
		<br>
		<!-- display the list of Patient !-->
		<?php
	//connect to mysql
		$conn = new mysqli("localhost","root","", "covideal");
		if ($conn->connect_error){
			die("Connection failure: " . mysqli_connect_error());
		}
		
		//use table
		$userTable = "use user";
		$conn->query($userTable);
	    $sql = "select user.*, test.status as test_status from user left join test on (user.id = test.id and test.status='pending') where user .position = 'patient' order by user.id";
		
		//testkit table
		$check = new mysqli("localhost","root","", "covideal");
		if ($check->connect_error){
			die("Connection failure: " . mysqli_connect_error());
		}
		
		$testkitTable="use testkit";
		$check->query($testkitTable);
		$test="SELECT kitid, testkitname FROM testkit where availableStock > 0 AND centreID='".$_SESSION["centreID"]."'";
		
		//fetch the data into while loop
		$resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));
		$resultset1 = mysqli_query($check, $test) or die("database error:". mysqli_error($check));
		
		$testkit_row = array();
		while($col = mysqli_fetch_assoc($resultset1)){
			$testkit_row[$col['kitid']] = $col['testkitname'];
		}
		
		//if material table dont have data, display the message
		if (mysqli_num_rows($resultset) == 0) { ?>
			<h3>Record New Patient And Create A New Test!</h3>
		<?php //if have materials
		} else {
		?>
		<h3>Patient Table</h3>
		<!-- list of all patient !-->
		<table class="table table-borderless" id="patientTable">
			  <thead>
				<tr class="thead-dark">
				  <th class="text-center">UserID</th>
				  <th class="text-center">Username</th>
				  <th class="text-center">Name</th>
				  <th class="text-center">Nation</th>
				  <th class="text-center">PatientType</th>
				  <th class="text-center">Symptoms</th>
				  <th></th>
				</tr>
			  </thead>
			  <tbody>
			   <!--table for patient details!-->
			  <?php
			  while($row = mysqli_fetch_array($resultset)):
			  
			  ?>
				<tr>
				  <td align="center"><?php echo $row['id'];?></td>
				  <td align="center"><?php echo $row['username'];?></td>
				  <td align="center"><?php echo $row['name'];?></td>
				  <td align="center"><?php echo $row['nation'];?></td>
				  <td align="center"><?php echo $row['patientType'];?></td>
				  <td align="center"><?php echo $row['symptoms'];?></td>
				  <td align="middle">
				  <?php
				  if($row['test_status']!='pending'){ ?>
				  <button type="button" id="update" value="update" data-toggle="modal" 
				  data-target="#updatePatientModal<?php echo $row['id'];?>" 
				  class="btn btn-primary"> Update</button>
				  <?php } 
				  else{?>
				  <button class="btn btn-dark" title="Cannot Update, Already Own A Test In Pending">Update</button>
				   <?php } ?>
				  </td>
				</tr>				
			  
				<!-- Update Test Kit Stock Modal !-->
				<form action="common.php" method="POST">
					<div class="modal fade" id="updatePatientModal<?php echo $row['id'];?>"
					tabindex="-1" role="dialog">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLongTitle">Update Patient & Record New Test</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									<div class="form-group row">
										<label for="id" class="col-sm-6 col-lg-4 col-form-label"> UserID </label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" class="form-control" name="id" value="<?php echo $row['id'];?>" readonly><br>
										</div>
									
										<label for="username" class="col-sm-6 col-lg-4 col-form-label"> Username </label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" class="form-control" name="username" value="<?php echo $row['username'];?>" readonly><br>
										</div>
										<label for="name" class="col-sm-6 col-lg-4 col-form-label"> name </label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" class="form-control" name="name" value="<?php echo $row['name'];?>" readonly><br>
										</div>
										
										<label for="patientType" class="col-sm-6 col-lg-4 col-form-label"> PatientType </label>
										<div class="col-sm-12 col-lg-8">
										<select name="patientType" class="form-control" >
												<option value="Returnee">Returnee</option>
												<option value="Quarantined">Quarantined</option>
												<option value="Close Contact">CloseContact</option>
												<option value="Infected">Infected</option>
												<option value="Suspected">Suspected</option>
											</select><br>
										</div>
										<label for="symptoms" class="col-sm-6 col-lg-4 col-form-label">Symptoms</label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" class="form-control" name="symptoms"
											maxlength = "50" pattern="^.*[a-zA-Z]+.*" title="Please enter the symptoms contains at least one letters !"
											placeholder="Symptoms of the Patient" required><br>
										</div>
										
										<label for="kitID"class="col-sm-6 col-lg-4 col-form-label">KITID</label>
										<div class="col-sm-12 col-lg-8">
											
											<select name="kitID" class="form-control" >
												<?php
												
													foreach($testkit_row  as $i => $v) :
												?>
												<option value="<?php echo $i ?>"><?php echo $i.":  ".$v;?></option>
												<?php endforeach ?>
											</select>
										</div>
										
									</div>
								</div>
								<div class="modal-footer">
								 <!--submit and go to common.php!-->
									<input name="action_name" value="updatePatient" hidden>
									<input type="submit" class="btn btn-primary" name="submit" value="Update">
								</div>
							</div>
						</div>
					</div>
				</form>
			 
			  <?php endwhile;?>
			</tbody>
		</table>
		<?php } ?>
				<br><br>
				<br>
		   </div>  
			
			
			</div>
		</div>
		<br><br><br><br>
		
		<!-- RecordPatient Modal !-->
			<form action="common.php" method="POST" class="needs-validation" novalidate>
				<div class="modal fade" id="recordPatientModal" tabindex="-1" role="dialog">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLongTitle">Record Patient & Record New Test</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-group row">
									<label for="username"class="col-sm-6 col-lg-4 col-form-label"> Username</label>
									<div class="col-sm-12 col-lg-8">
									<input type="text" class="form-control" name="username"  pattern="[a-zA-Z ]+" maxlength = "20"
									placeholder="Username" required>
									<div class="invalid-feedback">Username Should Only Contain Letters.</div><br>
								</div>

								<label for="password" class="col-sm-6 col-lg-4 col-form-label"> Password</label>
								<div class="col-sm-12 col-lg-8">
									<input type="password" class="form-control" name="password" pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
									minlength="8"
									maxlength = "20"
									placeholder="Password" required>
									<div class="invalid-feedback">Password Must Comtain Number And Letters,At Least Have 8 Letters</div><br>
								</div>


								<label for="name"class="col-sm-6 col-lg-4 col-form-label"> Name</label>
								<div class="col-sm-12 col-lg-8">
									<input type="text" class="form-control" name="name" pattern="[a-zA-Z ]+"
									maxlength = "50"
									placeholder="Full Name" required>
									<div class="invalid-feedback">Name Should Only Contain Letters.</div><br>
								</div>
								<label for="type"class="col-sm-6 col-lg-4 col-form-label">Nation</label>
								<div class="col-sm-12 col-lg-8">
								<select name="nation" id="nation" class="form-control">
									<option value="International">International</option>
									<option value="Local">Local</option>
								</select>
								<br>
								</div>
								<label for="type"class="col-sm-6 col-lg-4 col-form-label">Patient Type</label>
								<div class="col-sm-12 col-lg-8">
								<select name="patientType" id="patientType" class="form-control">
									<option value="Returnee">Returnee</option>
									<option value="Quarantine">Quarantine</option>
									<option value="Close Contact">Close Contact</option>
									<option value="Infected">Infected</option>
									<option value="Suspected">Suspected</option>
									
								</select>
								<br>
								</div>
								<label for="symptoms"class="col-sm-6 col-lg-4 col-form-label">Symptoms</label>
								<div class="col-sm-12 col-lg-8">
									<input type="text" class="form-control" name="symptoms"
									maxlength = "50"
									placeholder="Symptoms of the Patient" required>
									<div class="invalid-feedback">Please enter the Symptoms.</div><br>
								</div>
								
								<label for="kitID"class="col-sm-6 col-lg-4 col-form-label">KITID</label>
										<div class="col-sm-12 col-lg-8">
											
											<select name="kitID" class="form-control" >
												<?php
												
													foreach($testkit_row  as $i => $v) :
												?>
												<option value="<?php echo $i ?>"><?php echo $i.":   ".$v;?></option>
												<?php endforeach ?>
											</select>
										</div>
								</div>
							</div>
							 <!--go to common.php!-->
							<div class="modal-footer">
								<input name="action_name" value="recordPatient" hidden>
								<input type="submit" class="btn btn-primary" name="submit" value="Register">
							</div>
						</div>
					</div>
				</div>
			</form>
				
   <!-- footer !-->
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="button" target="_blank" href="https://www.facebook.com"><i class="fa fa-facebook"></i></a></li>
              <li><a class="button" target="_blank" href="https://www.twitter.com"><i class="fa fa-twitter"></i></a></li>
              <li><a class="button" target="_blank" href="https://www.instagram.com"><i class="fa fa-instagram"></i></a></li>
			  <li><a class="button" target="_blank" href="https://www.outlook.com"><i class="fa fa-envelope"></i></a></li>			  
            </ul>
          </div>
        </div>
      </div>
	</footer>
	<!-- javascript for search bar !-->
	<script>
		function searchPatient() {
		  var input, filter, table, tr, td, i, txtValue;
		  input = document.getElementById("filter");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("patientTable");
		  tr = table.getElementsByTagName("tr");
		  for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td")[0];
			if (td) {
			  txtValue = td.textContent || td.innerText;
			  if (txtValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			  } else {
				tr[i].style.display = "none";
			  }
			}
		  }
		}
		
		function dropdown(x) {  
            x.classList.toggle("fa fa-fw fa-user-circle");  
        }  
	</script>
</body>
</html>
<!--
Student Name: Ng Jun Zhi
Student ID: B1802197
!-->