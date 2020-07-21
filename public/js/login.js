$(document).ready(() => {
  // Getting references to our form and inputs
  const loginButton = $("#loginButton");
  const usernameInput = $("#username");
  const passwordInput = $("#password");

  loginButton.on("click", function(event){
    event.preventDefault()
    $.post("/api/login", {
      username: usernameInput.val(),
      password: passwordInput.val()
    }).then(function(){
      location.href = "/dashboard"
    })
  });
})