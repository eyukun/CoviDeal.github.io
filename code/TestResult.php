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
	<link rel="stylesheet" href="css/TestResult.css" type="text/css" media="screen">
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
    <title>CoviDeal - The Covid-19 Test Information System</title>
	
	<!-- js source !-->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
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
			<a class="nav-link" href="FindPatient.php">Record New Test</a>
         </li>
		 <li class="nav-item pill-3">
             <a class="nav-link active" href="UpdateTestResult.php">Update Test Result</a>
         </li>
 	   </ul>
 			
		<ul class="navbar-nav mr-auto">
       </ul>
       <a class="navbar-brand" href="index.php" style="font-family:cursive; color: white;"><i class="fa fa-sign-out"></i>Sign out</a>
      
 	</div>
   </nav>
   <!-- container !-->
   <br>
   <br>
  
   <div class = "container">
		<div class="row" id="box">
			<div class="col-lg-12">
				<div class="jumbotron">
				  <h1 class="display-4">View Test Result</h1>
				  <hr class="my-4">
				  <p style="font-size:20px;"> The Test Result is completed and displayed in a table </p><br>
				</div>
			</div>
		</div>	
	<hr>
		<br>
	 
   	<div class="col-lg-12">
		<div id="box">
   <!-- list of the updated test !-->
		<?php
		//connect to mysql
			$conn = new mysqli("localhost","root","", "covideal");
			if ($conn->connect_error){
				die("Connection failure: " . mysqli_connect_error());
			}
	
			$testID = $_GET["test_id"];
			$testTable = "test";
			$conn->query($testTable);
			$sql = "SELECT * FROM test WHERE testID = $testID";
			
			//fetch the data into while loop
			$resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));
			?>
			
			<h3>Test Table</h3>
			<!-- list of all tests !-->
			<form action="UpdateTestResult.php">
			<table class="table table-borderless table-secondary" id="testTable">
				  <thead>
					<tr class="thead-dark">
					  <th class="text-center">Test ID</th>
					  <th class="text-center">Test Date</th>
					  <th class="text-center">Result</th>
					  <th class="text-center">Result Date</th>
					  <th class="text-center">status</th>
					  <th class="text-center">Patient ID</th>
					  <th class="text-center">Kit ID</th>
					  <th class="text-center">Patient Name</th>
					  <th class="text-center">Administered By</th>
					</tr>
				  </thead>
				  <tbody>
				  <?php
				  // get each row of test kit into table
				  while($row = mysqli_fetch_array($resultset)):
				  ?>
					<tr>
					  <td align="center"><?php echo $row['testID'];?></td>
					  <td align="center"><?php echo $row['testDate'];?></td>
					  <td align="center"><?php echo $row['result'];?></td>
					  <td align="center"><?php echo $row['resultDate'];?></td>
					  <td align="center"><?php echo $row['status'];?></td>
					  <td align="center"><?php echo $row['id'];?></td>
					  <td align="center"><?php echo $row['kitID'];?></td>
					  <td align="center"><?php echo $row['patientName'];?></td>
					  <td align="center"><?php echo $row['testerName'];?></td>
					</tr>				
				<?php endwhile;?>
				</tbody>
			</table>
				<div class="modal-footer">
					<input type="submit" class="btn btn-primary" name="Done" value="Done">
				</div>
			</form>			
				<br><br>
				<br>
		   </div>  
			
			
			</div>
		</div>
	  </div>
	</div>
		<br><br><br><br>
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
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	 <!--java script!-->
	<script>		
		function dropdown(x) {  
            x.classList.toggle("fa fa-fw fa-user-circle");  
        }  
	</script>
</body>
</html>
<!--
Student Name: Eyu Kun
Student ID: B1900083
!-->
