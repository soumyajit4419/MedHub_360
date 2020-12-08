const url = "https://health-automation-application.herokuapp.com";
const url1 = "https://health-conona-detect.herokuapp.com";

$("#resAlert").hide();

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

function predictDisease() {
  $("#resAlert").hide();
  var trip = $("#trip").val();
  var fever = $("#fever").val();
  var iteyes = $("#iteyes").val();
  var runnose = $("#runnose").val();
  var trbr = $("#trbr").val();
  var cough = $("#cough").val();

  if (trip == "") return;
  if (fever == "") return;
  if (iteyes == "") return;
  if (runnose == "") return;
  if (trbr == "") return;
  if (cough == "") return;
  var data = JSON.stringify({
    values: [trip, fever, iteyes, runnose, trbr, cough],
  });
  console.log(data);
  $.ajax({
    url: url1 + "/predict",
    method: "POST",
    crossDomain: true,
    dataType: "json",
    data: data,
    success: function (res) {
      console.log(res);
      $("#resAlert").html(`Disease maybe ${res}`);
      $("#resAlert").show();
    },
  });
}
