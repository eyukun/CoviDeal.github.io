<!--
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
!-->
<?php 
SESSION_START();
SESSION_DESTROY();
require_once("common.php");
?>
<!DOCTYPE html>
 <html lang="en">
 <!-- head !-->
 <head>
    
	<!-- css source !-->
	 <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
	<link rel="stylesheet" href="css/Index.css" type="text/css" media="screen">
	<link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
    <title>CoviDeal - The Covid-19 Test Information System</title>
	
	<!-- js source !-->
	<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.js"></script>
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src='https://code.jquery.com/jquery-3.2.1.min.js'> </script>
	<script src="js/index.js"></script>
	
	<!-- background gif !-->
	<style>
		  body {
		  background-image: url('corona.gif');
		  background-repeat: no-repeat;
		  background-position: center;
		  background-size: 50%;
		  width: 100%;
		  }
	
	</style>
  </head>

 <body>
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
		   </ul>
		  
		</div>
   </nav>
   
	<!-- body !-->
	<!-- home details !-->
		  <h1 id="welcome" class="text-center"> Welcome to CoviDeal</h1>
		  <br>
			  <div style="text-align:center">
				<a class="login" data-toggle="modal" data-target="#loginModal">
				  <span role="button">LogIn</span>
				</a>
			  </div>	
	
	<!-- Login Modal !-->
			<form action="common.php" method="POST" class="needs-validation" novalidate>
				<div class="modal fade" id="loginModal" tabindex="-1" role="dialog">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLongTitle">Login</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<!-- input values !-->
							<div class="modal-body">
								<div class="form-group row">
									<label for="username" class="col-sm-6 col-lg-4 col-form-label"> User Name </label>
									<div class="col-sm-12 col-lg-8">
										<input type="text" pattern="[a-zA-Z ]+"
										class="form-control" name="username" required>
										<div class="invalid-feedback">Please enter a username contains only letters.</div><br>
									</div>
						
									<label for="Income Stock" class="col-sm-6 col-lg-4 col-form-label"> Password </label>
									<div class="col-sm-12 col-lg-8">
										<input type="password" pattern="(?=.*\d)(?=.*[a-zA-Z]).{8,}"
										class="form-control" name="password" required>
										<div class="invalid-feedback">Please enter a password contains at least one number and one letter, and at least 8 or more characters.</div><br>
									</div>
								</div>
							</div>
							<!-- submit button !-->
							<div class="modal-footer">
								<input name="action_name" value="login" hidden>
								<input type="submit" style="margin: 0 auto;" class="btn btn-primary" name="submit" value="Login">
							</div>
						</div>
					</div>
				</div>
			</form>
	
	
	<!-- footer !-->
    <div class="site-footer">
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
	</div>
</body>
</html>
<!--
Student Name: Eyu Kun
Student ID: B1900083
Student Name: Ng Jun Zhi
Student ID: B1802197
!-->