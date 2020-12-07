const url = "https://health-automation-application.herokuapp.com";
$("#sugarUpload").hide();
$("#resAlert").hide();

let date = "";
let bloodGlucoseF = "";
let bloodGlucosePP = "";

$.ajax({
  url: url + "/doc/verify",
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
const input = document.getElementById("file-1");
var label = input.nextElementSibling,
  labelVal = label.innerHTML;

input.addEventListener("change", function (e) {
  var fileName = "";
  if (this.files && this.files.length > 1)
    fileName = (this.getAttribute("data-multiple-caption") || "").replace(
      "{count}",
      this.files.length
    );
  else fileName = e.target.value.split("\\").pop();

  if (fileName) {
    label.querySelector("span").innerHTML = fileName;

    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $("#selected-image").attr("src", dataURL);
      $("#selected-image").addClass("col-12");
    };
    let file = this.files[0];
    reader.readAsDataURL(file);
    startRecognize(file);
  } else {
    label.innerHTML = labelVal;
    $("#selected-image").attr("src", "");
    $("#selected-image").removeClass("col-12");
    $("#arrow-right").addClass("fa-arrow-right");
    $("#arrow-right").removeClass("fa-check");
    $("#arrow-right").removeClass("fa-spinner fa-spin");
    $("#arrow-down").addClass("fa-arrow-down");
    $("#arrow-down").removeClass("fa-check");
    $("#arrow-down").removeClass("fa-spinner fa-spin");
    $("#log2").empty();
  }
});

$("#startLink").click(function () {
  var img = document.getElementById("selected-image");
  startRecognize(img);
});

function startRecognize(img) {
  $("#arrow-right").removeClass("fa-arrow-right");
  $("#arrow-right").addClass("fa-spinner fa-spin");
  $("#arrow-down").removeClass("fa-arrow-down");
  $("#arrow-down").addClass("fa-spinner fa-spin");
  recognizeFile(img);
}

function progressUpdate(packet) {
  var log = document.getElementById("log");

  if (log.firstChild && log.firstChild.status === packet.status) {
    if ("progress" in packet) {
      var progress = log.firstChild.querySelector("progress");
      progress.value = packet.progress;
    }
  } else {
    var line = document.createElement("div");
    line.status = packet.status;
    var status = document.createElement("div");
    status.className = "status";
    status.appendChild(document.createTextNode(packet.status));
    line.appendChild(status);

    if ("progress" in packet) {
      var progress = document.createElement("progress");
      progress.value = packet.progress;
      progress.max = 1;
      line.appendChild(progress);
    }

    if (packet.status == "done") {
      log.innerHTML = "";
      var pre = document.createElement("pre");
      pre.appendChild(
        document.createTextNode(packet.data.text.replace(/\n\s*\n/g, "\n"))
      );
      pre.classList.add("text-muted");
      line.innerHTML = "";
      line.appendChild(pre);
      $(".fas").removeClass("fa-spinner fa-spin");
      $(".fas").addClass("fa-check");
    }

    log.insertBefore(line, log.firstChild);
  }
}

function recognizeFile(file) {
  $("#log").empty();
  const corePath =
    window.navigator.userAgent.indexOf("Edge") > -1
      ? "js/tesseract-core.asm.js"
      : "js/tesseract-core.wasm.js";

  const worker = new Tesseract.TesseractWorker({
    corePath,
  });

  worker
    .recognize(file, $("#langsel").val())
    .progress(function (packet) {
      console.info(packet);
      progressUpdate(packet);
    })
    .then(function (data) {
      var l = data.lines.length;
      for (var i = 0; i < l; i++) {
        if (i == 0) {
          var ans = data.lines[i].text;
          ans = ans.split(" ");
          date = ans[2];
        } else if (i == 7) {
          var ans = data.lines[i].text;
          ans = ans.split(" ");
          bloodGlucoseF = ans[3];
        } else if (i == 8) {
          var ans = data.lines[i].text;
          ans = ans.split(" ");
          bloodGlucosePP = ans[3];
        }
      }
      console.log("Date:", date);
      console.log("bloodGlucoseF:", bloodGlucoseF);
      console.log("bloodGlucosePP:", bloodGlucosePP);
      $("#sugarUpload").show();
      progressUpdate({ status: "done", data: data });
    });
}

function uploadData() {
  $("#resAlert").hide();
  $.ajax({
    url: url + "/doc/updateSugarDetails",
    method: "POST",
    crossDomain: true,
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
    data: {
      date: date,
      bloodGlucoseF: bloodGlucoseF,
      bloodGlucosePP: bloodGlucosePP,
    },
    success: function (res) {
      if (res.status !== 200) {
        $("#resAlert").text(res.message);
        $("#resAlert").show();
      } else if (res.status === 200) {
        $("#resAlert").text(res.message);
        $("#resAlert").show();
        setInterval(function () {
          window.location.reload();
        }, 4000);
      }
    },
    error: function (err) {
      console.log(err);
      alert(err);
    },
  });
}
