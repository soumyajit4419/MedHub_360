$("#errorAlert").hide();

const url = "https://health-automation-application.herokuapp.com";

function login() {
  $("#errorAlert").hide();
  var userType = $("#inputUser").val();
  var email = $("#email").val();
  var password = $("#password").val();

  if (userType == "") return;
  if (email == "") return;
  if (password == "") return;

  if (userType == "Doc") {
    $.ajax({
      url: url + "/auth/loginDoc",
      method: "POST",
      crossDomain: true,
      data: {
        email: email,
        password: password,
      },
      success: function (res) {
        if (res.status !== 200) {
          $("#errorAlert").text(res.message);
          $("#errorAlert").show();
        } else if (res.status === 200) {
          localStorage.setItem("token", res.token);
          window.location = "doctor/docDash.html";
        }
      },
      error: function (err) {
        console.log(err);
        alert(err);
      },
    });
  } else if (userType == "Pat") {
    $.ajax({
      url: url + "/auth/loginUser",
      method: "POST",
      crossDomain: true,
      data: {
        email: email,
        password: password,
      },
      success: function (res) {
        if (res.status !== 200) {
          $("#errorAlert").text(res.message);
          $("#errorAlert").show();
        } else if (res.status === 200) {
          localStorage.setItem("token", res.token);
          window.location = "patient/patDash.html";
        }
      },
      error: function (err) {
        console.log(err);
        alert(err);
      },
    });
  }
}
