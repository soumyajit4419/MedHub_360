const url = "https://health-automation-application.herokuapp.com";

$("#errorAlert").hide();
$("#successAlert").hide();

$.ajax({
  url: url + "/user/verify",
  method: "GET",
  crossDomain: true,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },
  success: function (res) {
    if (res.status !== 200) {
      window.location = "../500.html";
    } else if (res.status === 200) {
      console.log("success");
    }
  },
  error: function (err) {
    console.log(err);
    alert(err);
  },
});

function logout() {
  localStorage.clear();
  window.location = "../index.html";
}

function resetPassword() {
  $("#errorAlert").hide();
  $("#successAlert").hide();

  var password = $("#password").val();
  var newPassword = $("#newPassword").val();

  if (password == "") return;
  if (newPassword == "") return;

  $.ajax({
    url: url + "/user/resetPassword",
    method: "POST",
    crossDomain: true,
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
    data: {
      password: password,
      newPassword: newPassword,
    },
    success: function (res) {
      if (res.status !== 200) {
        $("#errorAlert").text(res.message);
        $("#errorAlert").show();
      } else if (res.status === 200) {
        $("#successAlert").text(res.message);
        $("#successAlert").show();
        setInterval(function () {
          window.location.reload();
        }, 2000);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err);
    },
  });
}
