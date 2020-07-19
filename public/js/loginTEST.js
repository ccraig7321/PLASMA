var $username = $("#username");
var $password = $("#password");
var $loginBtn = $("#loginBtn");

$loginBtn.on("click", function(){
    var username = $username.val()
    var password = $password.val()
    console.log(username, password)
    var userInput = {
        email: $username.val().trim(),
        password: $password.val().trim()
      };
  
      if (!userInput.email || !userInput.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userInput.email, userInput.password);
      $username.val("");
      $password.val("");
})

function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function() {
        window.location.replace("/success");
        // If there's an error, log the error
        console.log("then")
      })
      .catch(function(err) {
        console.log(err);
      });
  }