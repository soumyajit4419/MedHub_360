const url = "http://127.0.0.1:5000";

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

function predictdisease(){
  var trip = $("#trip").val();
  var fever = $("#fever").val();
  var iteyes = $("#iteyes").val();
  var runnose = $("runnose").val();
  var trbr = $("#trbr").val();
  var cough = $("#cough").val();
  
  
  $.ajax({
    url: url + "/predict",
    method: "POST",
    crossDomain: true,
    data :{
      trip,
      fever,
      iteyes,
      runnose,
      trbr,
      cough, 
    },
    success: function (res){
      console.log(res.data);
      $("#result").html(`Disease Predicted ${res.data}`);
    } 
  })
}
