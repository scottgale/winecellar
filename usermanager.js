//user management
//https://www.npmjs.com/package/user-management
var UserManagement = require('user-management');
 

function createUser() {
	var USERNAME = 'foo';
	var PASSWORD = 'bar';
	var EXTRAS = {
	  name: 'Finnius F. Bar'
	};
	 
	var users = new UserManagement();
	users.load(function(err) {
	  console.log('Checking if the user exists');
	  users.userExists(USERNAME, function(err, exists) {
	    if (exists) {
	      console.log('  User already exists');
	      users.close();
	    } else {
	      console.log('  User does not exist');
	      console.log('Creating the user');
	      users.createUser(USERNAME, PASSWORD, EXTRAS, function (err) {
	        console.log('  User created');
	        users.close();
	      });
	    }
	  });
	});	
}

function authenticateUser() {	 
	var USERNAME = 'foo';
	var PASSWORD = 'bar';
	 
	var users = new UserManagement();
	users.load(function(err) {
	  users.authenticateUser(USERNAME, PASSWORD, function(err, result) {
	    if (!result.userExists) {
	      console.log('Invalid username');
	    } else if (!result.passwordsMatch) {
	      console.log('Invalid password');
	    } else {
	      console.log('User token is: '+ result.token);
	    }
	    users.close();
	  });
	});
}

function checkUserToken() {
	var USERNAME = 'foo';
	 
	var users = new UserManagement();
	users.load(function(err) {
	  users.getTokenForUsername(USERNAME, function(err, token) {
	    console.log('The user\'s token is: ' + token);
	    users.getUsernameForToken(token, function(err, username) {
	      console.log('The username for the token is: ' + username);
	    });
	    users.isTokenValid(token, function(err, valid) {
	      if (!valid) {
	        console.log('The token is not valid');
	      } else {
	        console.log('The token is valid');
	      }
	      users.close();
	    });
	  });
	});	
}

function resetPassword() {
	var USERNAME = 'foo';
 
	var users = new UserManagement();
	users.load(function(err) {
	  users.resetPassword(USERNAME, function(err, newPassword) {
	    console.log('User\'s password reset to: ' + newPassword);
	    users.authenticateUser(USERNAME, newPassword, function(err, result) {
	      if (!result.userExists) {
	        console.log('Invalid username');
	      } else if (!result.passwordsMatch) {
	        console.log('Invalid password');
	      } else {
	        console.log('User token is: ' + result.token);
	      }
	      users.close();
	    });
	  });
	});
}