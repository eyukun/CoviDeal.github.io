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
	<link rel="stylesheet" href="css/GenerateTestReport.css" type="text/css" media="screen">
		 <link rel="stylesheet" href="css/generateTestReport.css" type="text/css" media="print">
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
		 <li class="nav-item pill-3">
             <a class="nav-link active" href="GenerateTestReport.php">Generate Test Report</a>
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
				<br><br>
				  <h1 class="display-4">Generate Test Report</h1>
				   <hr class="my-4">
				  <p style="font-size:40px;"> 
					Centre Name:
					<?php
						echo $_SESSION["centreName"];
					?>
					<br>
					Centre Owner:
					<?php
						echo $_SESSION["centreOwner"];
					?>
				  </p><br>
				<br><br>
				</div>
			</div>
		</div>	
	<hr>
	
		 <!--error message!-->
		<div class="form-group">
			<div class="form-group">
				<div class="col-lg-12">
				</div>
			</div>
		</div>
		<br>

	<div class="col-lg-12">
		<div id="box">
		<!-- search bar !-->
			 <div class="row align-items-center">
				<div class="mx-auto">
					 <form class="form-inline">
						<i class="fa fa-search" aria-hidden="true" 
						style="margin-right: 6px;"></i>
					   <input class="form-control" id="filter" 
					   type="number" min="1" style="width: 400px;"
					   placeholder="Search by Test ID" onkeyup="searchTest()">
					 </form>	
				 </div>
			 </div>
		<br>
	 
   
   <!-- list of all tests !-->
		<?php
		//connect to mysql
			$conn = new mysqli("localhost","root","", "covideal");
			if ($conn->connect_error){
				die("Connection failure: " . mysqli_connect_error());
			}
			// select all done test which kitID is match with the current centre's test kit kitID and also match with current tester
			// this also meaning list all the test in this centre
			$sql = "SELECT * FROM test where  (status = 'complete') AND(resultDate=CURDATE()) AND (kitID IN (SELECT kitID FROM testkit where centreID='".$_SESSION['centreID']."'));";
			$result = mysqli_query($conn, $sql);
			
			//fetch the data into while loop
			$resultset = mysqli_query($conn, $sql) or die("database error:". mysqli_error($conn));
			
			//if test table dont have data, display the message
			if (mysqli_num_rows($result) == 0) { ?>
				<h3>There are no test currently, please record one !</h3>
			<?php 
			} // if have data
			else { ?>
			
			<h3>Test Table</h3>
			<!-- list of all tests !-->
			<table class="table table-borderless table-secondary" id="testTable">
				<form class="form-control">
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
			  </form>
			</table>
			
				<button class="btn btn-success" id="btn1" onclick="window.print()">Print Test Report</button>
			<?php } ?>
				<br><br>
				<br><br><br>
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
		function searchTest() {
		  var input, filter, table, tr, td, i, txtValue;
		  input = document.getElementById("filter");
		  filter = input.value.toUpperCase();
		  table = document.getElementById("testTable");
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
Student Name: Eyu Kun
Student ID: B1900083
!-->
