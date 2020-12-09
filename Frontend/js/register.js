const url = "https://health-automation-application.herokuapp.com";

$("#successAlert").hide();
$("#errorAlert").hide();
$("#successBtn").hide();
$("#spinner").hide();

function register() {
  $("#successAlert").hide();
  $("#errorAlert").hide();
  $("#successBtn").hide();

  var name = $("#name").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var confirmPassword = $("#confirmPassword").val();
  var age = $("#age").val();
  var sex = $("#sex").val();
  var userType = $("#inputUser").val();
  var height = $("#height").val();
  var weight = $("#weight").val();

  if (name == "") return;
  if (email == "") return;
  if (password == "") return;
  if (confirmPassword == "") return;
  if (age == "") return;
  if (sex == "") return;
  if (weight == "") return;
  if (height == "") return;
  if (userType == "") return;

  $("#signUp").prop("disabled", true);
  $("#spinner").show();

  if (password != confirmPassword) {
    $("#errorAlert").text("Password Din't Match");
    $("#errorAlert").show();
  }

  if (userType == "Doc") {
    $.ajax({
      url: url + "/auth/registerDoc",
      method: "POST",
      crossDomain: true,
      data: {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        age: age,
        sex: sex,
        weight: weight,
        height: height,
      },
      success: function (res) {
        if (res.status !== 200) {
          $("#errorAlert").text(res.message);
          $("#errorAlert").show();
          $("#signUp").prop("disabled", false);
          $("#spinner").hide();
        } else if (res.status === 200) {
          $("#successAlert").text(res.message);
          $("#successAlert").show();
          $("#successBtn").show();
          $("#signUp").prop("disabled", false);
          $("#spinner").hide();
        }
      },
      error: function (err) {
        console.log(err);
        alert(err);
      },
    });
  } else if (userType == "Pat") {
    $.ajax({
      url: url + "/auth/registerUser",
      method: "POST",
      crossDomain: true,
      data: {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        age: age,
        sex: sex,
        weight: weight,
        height: height,
      },
      success: function (res) {
        if (res.status !== 200) {
          $("#errorAlert").text(res.message);
          $("#errorAlert").show();
          $("#signUp").prop("disabled", false);
          $("#spinner").hide();
        } else if (res.status === 200) {
          $("#successAlert").text(res.message);
          $("#successAlert").show();
          $("#successBtn").show();
          $("#signUp").prop("disabled", false);
          $("#spinner").hide();
        }
      },
      error: function (err) {
        console.log(err);
        alert(err);
      },
    });
  }
}
