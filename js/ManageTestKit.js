/**
Student Name: Eyu Kun
Student ID: B1900083
**/
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
**/
