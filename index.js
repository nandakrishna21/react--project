$(document).ready(() => {
  $("#login-btn").click((e) => {
    e.preventDefault();

    credObj = {
      name: $("#u-name").val(),
      password: $("#passwd").val(),
    };

    if (credObj.name != credObj.password) {
      alert("Please Enter Proper Credentials!");
    } else {
      localStorage.setItem("user-credentials", JSON.stringify(credObj));
    }

    let userName = $("#u-name").val();
    let password = $("#passwd").val();

    let credentials = JSON.parse(localStorage.getItem("user-credentials"));

    if (credentials == null && credentials == undefined) {
      alert("Invalid Credentials");
    } else if (
      credentials.name == userName &&
      credentials.password == password
    ) {
      alert("Logged in Successfully");
      location.assign("../orders.html");
    }
  });
});
