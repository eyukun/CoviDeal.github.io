<!--
Student Name: Eyu Kun
Student ID: B1900083
!-->
<?php
	require_once('common.php');
 ?>
<!DOCTYPE html>
 <html lang="en">
 <head>
    
	 <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<!-- css source !-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" href="css/RegisterTestCentre.css" type="text/css" media="screen">
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
    <title>CoviDeal - The Covid-19 Test Information System</title>
	
	<!-- js source !-->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script type="text/javascript" src="js/registerTestCentre.js"></script>
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
					   <i class="fa fa-fw fa-user-circle" onclick="dropdown(this)"></i>
					   Hi, <?php echo $_SESSION["username"]; ?>
					   </a>
				   </button>
				   <!-- Dropdown options !-->
					<div class="dropdown-menu">
						<a class="dropdown-item" href="#"> Username: <?php echo $_SESSION["username"]; ?> </a>
						<a class="dropdown-item" href="#"> Position: <?php echo $_SESSION["position"]; ?> </a>
						<a class="dropdown-item" href="#"> Name: <?php echo $_SESSION["user_name"]; ?> </a>
						<?php if(isset($_SESSION['centreID']) != null) { ?>
							<a class="dropdown-item" href="#"> Centre ID: <?php echo $_SESSION["centreID"]; ?> </a>
							<a class="dropdown-item" href="#"> Centre Name: <?php echo $_SESSION["centreName"]; ?> </a>
						<?php } ?>
					</div>
				</div>
			</li>
         <li class="nav-item pill-2">
             <a 
			 <?php if(isset($_SESSION['centreID']) != null){ ?> href="#" title="You are owning a test centre currently !" 
			 class="nav-link active text-secondary"
			 <?php }
			else { ?> class="nav-link active" href="RegisterTestCentre.php" <?php } ?>
			 >Register Centre</a>
         </li>
		
         <li class="nav-item pill-3">
             <a 
			 <?php if(isset($_SESSION['centreID']) == null){ ?> href="#" title="Please register a test centre first !" 
			 class="nav-link text-secondary"
			 <?php }
			 else { ?> class="nav-link" href="RecordTester.php" <?php } ?>
			 >Record Tester</a>
         </li>
		 <li class="nav-item pill-4">
             <a 
			 <?php if(isset($_SESSION['centreID']) == null){ ?> href="#" title="Please register a test centre first !" 
			 class="nav-link text-secondary"
			 <?php } 
			 else { ?> class="nav-link" href="ManageTestKit.php" <?php } ?>
			 >Manage Test Kit Stock</a>
         </li>
 	   </ul>
 			
		<ul class="navbar-nav mr-auto">
       </ul>
       <a class="navbar-brand" href="index.php" style="font-family:cursive; color: white;"><i class="fa fa-sign-out"></i>Sign out</a>
      </div>
   </nav>
	<!-- container !-->
	<!-- register centre details !-->
	<br>
	<br>
		<div class = "container">
		<div class="row" id="box">
		  <div class="col-lg-12">
				<div class="jumbotron">
				  <h1 class="display-4">Register Test Centre</h1>
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
				  <p style="font-size:20px;"> Register a test centre with approved name and set up for it</p><br>
				  <p class="lead">
				  <!-- register button !-->
					<button id="btn1" data-toggle="modal" 
					<?php if($_SESSION['centreID'] != null){ ?> data-target="#" 
					class="btn btn-dark"
					title="You cannot register more than one test centre !" <?php }
					 else { ?>  class="btn btn-success" data-target="#registerCentreModal" <?php } ?>
					>Register Test Centre</button>
				  </p>
				</div>
			
			<br><br><br><br><br><br><br>
		 
			 <!-- Register Test Centre Modal !-->
				<form action="common.php" method="POST" class="needs-validation" novalidate>
					<div class="modal fade" id="registerCentreModal" tabindex="-1" role="dialog">
						<div class="modal-dialog modal-dialog-centered" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="exampleModalLongTitle">Register Test Centre</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<!-- input values !-->
								<div class="modal-body">
									<div class="form-group row">
										<label for="centreName" class="col-sm-6 col-lg-4 col-form-label"> Centre Name</label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" pattern="^.*[a-zA-Z]+.*"
											class="form-control" name="centreName" required>
											<div class="invalid-feedback">Please enter a centre name contains at least one letter.</div><br>
										</div>
										<label for="address" class="col-sm-6 col-lg-4 col-form-label"> Address </label>
										<div class="col-sm-12 col-lg-8">
											<input type="text" pattern="^.*[a-zA-Z]+.*"
											class="form-control" name="address" required>
											<div class="invalid-feedback">Please enter an address contains at least one letter.</div><br>
										</div>
									</div>
								</div>
								<!-- register button !-->
								<div class="modal-footer">
									<input name="action_name" value="registerTestCentre" hidden>
									<input type="submit" class="btn btn-primary" name="submit" value="Register">
								</div>
							</div>
						</div>
					</div>
				</form>
				
				</div>
			</div>
		</div>
		
	
	
	<!-- footer !-->
	  <!-- Site footer -->
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