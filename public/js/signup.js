$(document).ready(() => {
    // Getting references to our form and inputs
    const signupButton = $("#signupButton");
    const usernameInput = $("#username");
    const passwordInput = $("#password");
  
    signupButton.on("click", function(event){
      event.preventDefault()
      $.post("/api/signup", {
        username: usernameInput.val(),
        password: passwordInput.val(),
        name: $("#name").val()
      }).then(function(){
        location.href = "/login"
      })
    });
})