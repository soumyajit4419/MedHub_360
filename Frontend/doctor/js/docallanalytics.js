const url = "https://health-automation-application.herokuapp.com";

$("#gpAlyts").css("visibility", "hidden");

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

$.ajax({
  url: url + "/doc/getallUserData",
  method: "GET",
  crossDomain: true,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },

  success: function (res) {
    if (res.status !== 200) {
      // window.location = "../500.html";
    } else if (res.status === 200) {
      sugararrfmean = [];
      sugararrppmean = [];
      plateletmean = [];
      hgmean = [];
      rbcmean = [];
      category = [];

      var len = res.data.length;

      for (var i = 1; i <= len; i++) {
        var s = "User";
        s = s + " " + i.toString();
        category.push(s);
      }

      num_sugar_tests = [];
      num_blood_count_tests = [];

      for (var i = 0; i < len; i++) {
        num_sugar_tests.push(res.data[i].sugar.length);
        num_blood_count_tests.push(res.data[i].bloodCount.length);
      }

      for (var i = 0; i < len; i++) {
        var sumsugf = 0;
        var sumsugpp = 0;
        var sumplatelet = 0;
        var sumhg = 0;
        var sumrbc = 0;

        var countsugf = 0;
        var countsugpp = 0;
        var countplatelet = 0;
        var counthg = 0;
        var countrbc = 0;

        var sugflen = res.data[i].sugar.length;
        var bloodcountlen = res.data[i].bloodCount.length;

        for (var j = 0; j < sugflen; j++) {
          if (
            res.data[i].sugar[j].bloodGlucoseF != 0 ||
            res.data[i].sugar[j].bloodGlucoseF != ""
          ) {
            sumsugf += parseInt(res.data[i].sugar[j].bloodGlucoseF);
            countsugf++;
          }

          if (
            res.data[i].sugar[j].bloodGlucosePP != 0 ||
            res.data[i].sugar[j].bloodGlucosePP != ""
          ) {
            sumsugpp += parseInt(res.data[i].sugar[j].bloodGlucosePP);
            countsugpp++;
          }
        }

        for (var k = 0; k < bloodcountlen; k++) {
          if (
            res.data[i].bloodCount[k].platelateCount != 0 ||
            res.data[i].bloodCount[k].platelateCount != ""
          ) {
            sumplatelet += parseInt(res.data[i].bloodCount[k].platelateCount);
            countplatelet++;
          }

          if (
            res.data[i].bloodCount[k].hemoglobin != 0 ||
            res.data[i].bloodCount[k].hemoglobin != " "
          ) {
            sumhg += parseInt(res.data[i].bloodCount[k].hemoglobin);
            counthg++;
          }

          if (
            res.data[i].bloodCount[k].rbcCount != 0 ||
            res.data[i].bloodCount[k].rbcCount != " "
          ) {
            sumrbc += parseInt(res.data[i].bloodCount[k].rbcCount);
            countrbc++;
          }
        }

        sugararrfmean.push((sumsugf / countsugf).toFixed(2));
        sugararrppmean.push((sumsugpp / countsugpp).toFixed(2));
        plateletmean.push((sumplatelet / countplatelet).toFixed(2));
        hgmean.push((sumhg / counthg).toFixed(2));
        rbcmean.push((sumrbc / countrbc).toFixed(2));
      }

      // Sugar Chart
      var columnChart,
        columnChartoptions = {
          series: [
            {
              name: "Blood Sugar(F) Average",
              data: sugararrfmean,
            },
            {
              name: "Blood Sugar(PP) Average",
              data: sugararrppmean,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
            stacked: !1,
            columnWidth: "70%",
            zoom: { enabled: !0 },
            toolbar: { show: !1 },
            background: "transparent",
          },
          dataLabels: { enabled: !1 },
          theme: { mode: colors.chartTheme },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: !1,
              columnWidth: "60%",
              radius: 30,
              enableShades: !1,
              endingShape: "rounded",
            },
          },
          xaxis: {
            type: "category",
            categories: category,
            labels: {
              show: !0,
              trim: !0,
              minHeight: void 0,
              maxHeight: 120,

              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },
          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -10,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },
          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,
            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: "#fff",
              fillColors: [extend.primaryColor, extend.primaryColorLighter],
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          fill: {
            opacity: 1,
            colors: [base.primaryColor, extend.primaryColorLighter],
          },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !1 } },
            yaxis: { lines: { show: !0 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        columnChartCtn = document.querySelector("#columnChartpat");
      columnChartCtn &&
        (columnChart = new ApexCharts(
          columnChartCtn,
          columnChartoptions
        )).render();

      // Blood Count Chart
      var lineChart,
        lineChartoptions = {
          series: [
            {
              name: "Haemoglobin",
              data: hgmean,
            },
            {
              name: "Platelet Count",
              data: plateletmean,
            },
            {
              name: "RBC Count",
              data: rbcmean,
            },
          ],
          chart: {
            height: 350,
            type: "line",
            background: "transparent",
            zoom: { enabled: !1 },
            toolbar: { show: !1 },
          },
          theme: { mode: colors.chartTheme },
          stroke: {
            show: !0,
            curve: "smooth",
            lineCap: "round",
            colors: chartColors,
            width: [3, 2, 3],
            dashArray: [0, 0, 0],
          },
          dataLabels: { enabled: !1 },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          markers: {
            size: 4,
            colors: base.primaryColor,
            strokeColors: colors.borderColor,
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: void 0,
            onDblClick: void 0,
            showNullDataPoints: !0,
            hover: { size: void 0, sizeOffset: 3 },
          },
          xaxis: {
            type: "category",
            categories: category,
            labels: {
              show: !0,
              trim: !1,

              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },
          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -10,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },
          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,
            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: colors.borderColor,
              fillColors: chartColors,
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !1 } },
            yaxis: { lines: { show: !0 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        lineChartCtn = document.querySelector("#lineChartpat");
      lineChartCtn &&
        (lineChart = new ApexCharts(lineChartCtn, lineChartoptions)).render();

      var barChart,
        barChartoptions = {
          series: [
            { name: "Sugar Tests", data: num_sugar_tests },

            { name: "Blood Count Tests", data: num_blood_count_tests },
          ],

          chart: {
            type: "bar",
            height: 350,
            background: "transparent",
            stacked: !0,
            columnWidth: "70%",
            zoom: { enabled: !1 },
            toolbar: { enabled: !1 },
          },
          theme: { mode: colors.chartTheme },
          dataLabels: { enabled: !0 },

          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          plotOptions: { bar: { horizontal: !0, columnWidth: "30%" } },

          xaxis: {
            categories: category,

            labels: {
              show: !0,
              trim: !1,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },

          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -5,
              minHeight: void 0,
              maxHeight: 120,

              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },

          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,

            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            offsetY: 10,
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: colors.borderColor,
              fillColors: chartColors,
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          fill: { opacity: 1, colors: chartColors },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !0 } },
            yaxis: { lines: { show: !1 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 10 },
          },
        },
        barChartCtn = document.querySelector("#barChartpat");
      barChartCtn &&
        (barChart = new ApexCharts(barChartCtn, barChartoptions)).render();
    }
  },
  error: function (err) {
    console.log(err);
    alert(err);
  },
});

$.ajax({
  url: url + "/doc/getallDocData",
  method: "GET",
  crossDomain: true,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },

  success: function (res) {
    if (res.status !== 200) {
      // window.location = "../500.html";
    } else if (res.status === 200) {
      sugararrfmean = [];
      sugararrppmean = [];
      plateletmean = [];
      hgmean = [];
      rbcmean = [];
      category = [];

      var len = res.data.length;

      for (var i = 1; i <= len; i++) {
        var s = "User";
        s = s + " " + i.toString();
        category.push(s);
      }

      num_sugar_tests = [];
      num_blood_count_tests = [];

      for (var i = 0; i < len; i++) {
        num_sugar_tests.push(res.data[i].sugar.length);
        num_blood_count_tests.push(res.data[i].bloodCount.length);
      }

      for (var i = 0; i < len; i++) {
        var sumsugf = 0;
        var sumsugpp = 0;
        var sumplatelet = 0;
        var sumhg = 0;
        var sumrbc = 0;

        var countsugf = 0;
        var countsugpp = 0;
        var countplatelet = 0;
        var counthg = 0;
        var countrbc = 0;

        var sugflen = res.data[i].sugar.length;
        var bloodcountlen = res.data[i].bloodCount.length;

        for (var j = 0; j < sugflen; j++) {
          if (
            res.data[i].sugar[j].bloodGlucoseF != 0 ||
            res.data[i].sugar[j].bloodGlucoseF != ""
          ) {
            sumsugf += parseInt(res.data[i].sugar[j].bloodGlucoseF);
            countsugf++;
          }

          if (
            res.data[i].sugar[j].bloodGlucosePP != 0 ||
            res.data[i].sugar[j].bloodGlucosePP != ""
          ) {
            sumsugpp += parseInt(res.data[i].sugar[j].bloodGlucosePP);
            countsugpp++;
          }
        }

        for (var k = 0; k < bloodcountlen; k++) {
          if (
            res.data[i].bloodCount[k].platelateCount != 0 ||
            res.data[i].bloodCount[k].platelateCount != ""
          ) {
            sumplatelet += parseInt(res.data[i].bloodCount[k].platelateCount);
            countplatelet++;
          }

          if (
            res.data[i].bloodCount[k].hemoglobin != 0 ||
            res.data[i].bloodCount[k].hemoglobin != " "
          ) {
            sumhg += parseInt(res.data[i].bloodCount[k].hemoglobin);
            counthg++;
          }

          if (
            res.data[i].bloodCount[k].rbcCount != 0 ||
            res.data[i].bloodCount[k].rbcCount != " "
          ) {
            sumrbc += parseInt(res.data[i].bloodCount[k].rbcCount);
            countrbc++;
          }
        }

        sugararrfmean.push((sumsugf / countsugf).toFixed(2));
        sugararrppmean.push((sumsugpp / countsugpp).toFixed(2));
        plateletmean.push((sumplatelet / countplatelet).toFixed(2));
        hgmean.push((sumhg / counthg).toFixed(2));
        rbcmean.push((sumrbc / countrbc).toFixed(2));
      }

      // Sugar Chart
      var columnChart,
        columnChartoptions = {
          series: [
            {
              name: "Blood Sugar(F) Average",
              data: sugararrfmean,
            },
            {
              name: "Blood Sugar(PP) Average",
              data: sugararrppmean,
            },
          ],
          chart: {
            type: "bar",
            height: 350,
            stacked: !1,
            columnWidth: "70%",
            zoom: { enabled: !0 },
            toolbar: { show: !1 },
            background: "transparent",
          },
          dataLabels: { enabled: !1 },
          theme: { mode: colors.chartTheme },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          plotOptions: {
            bar: {
              horizontal: !1,
              columnWidth: "60%",
              radius: 30,
              enableShades: !1,
              endingShape: "rounded",
            },
          },
          xaxis: {
            type: "category",
            categories: category,
            labels: {
              show: !0,
              trim: !0,
              minHeight: void 0,
              maxHeight: 120,

              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },
          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -10,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },
          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,
            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: "#fff",
              fillColors: [extend.primaryColor, extend.primaryColorLighter],
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          fill: {
            opacity: 1,
            colors: [base.primaryColor, extend.primaryColorLighter],
          },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !1 } },
            yaxis: { lines: { show: !0 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        columnChartCtn = document.querySelector("#columnChartdoc");
      columnChartCtn &&
        (columnChart = new ApexCharts(
          columnChartCtn,
          columnChartoptions
        )).render();

      // Blood Count Chart
      var lineChart,
        lineChartoptions = {
          series: [
            {
              name: "Haemoglobin Average",
              data: hgmean,
            },
            {
              name: "Platelet Count Average",
              data: plateletmean,
            },
            {
              name: "RBC Count Average",
              data: rbcmean,
            },
          ],
          chart: {
            height: 350,
            type: "line",
            background: "transparent",
            zoom: { enabled: !1 },
            toolbar: { show: !1 },
          },
          theme: { mode: colors.chartTheme },
          stroke: {
            show: !0,
            curve: "smooth",
            lineCap: "round",
            colors: chartColors,
            width: [3, 2, 3],
            dashArray: [0, 0, 0],
          },
          dataLabels: { enabled: !1 },
          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          markers: {
            size: 4,
            colors: base.primaryColor,
            strokeColors: colors.borderColor,
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: void 0,
            onDblClick: void 0,
            showNullDataPoints: !0,
            hover: { size: void 0, sizeOffset: 3 },
          },
          xaxis: {
            type: "category",
            categories: category,
            labels: {
              show: !0,
              trim: !1,

              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },
          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -10,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },
          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,
            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: colors.borderColor,
              fillColors: chartColors,
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !1 } },
            yaxis: { lines: { show: !0 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
          },
        },
        lineChartCtn = document.querySelector("#lineChartdoc");
      lineChartCtn &&
        (lineChart = new ApexCharts(lineChartCtn, lineChartoptions)).render();

      var barChart,
        barChartoptions = {
          series: [
            { name: "Sugar Tests", data: num_sugar_tests },

            { name: "Blood Count Tests", data: num_blood_count_tests },
          ],

          chart: {
            type: "bar",
            height: 350,
            background: "transparent",
            stacked: !0,
            columnWidth: "70%",
            zoom: { enabled: !1 },
            toolbar: { enabled: !1 },
          },
          theme: { mode: colors.chartTheme },
          dataLabels: { enabled: !0 },

          responsive: [
            {
              breakpoint: 480,
              options: {
                legend: { position: "bottom", offsetX: -10, offsetY: 0 },
              },
            },
          ],
          plotOptions: { bar: { horizontal: !0, columnWidth: "30%" } },

          xaxis: {
            categories: category,

            labels: {
              show: !0,
              trim: !1,
              minHeight: void 0,
              maxHeight: 120,
              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
            axisBorder: { show: !1 },
          },

          yaxis: {
            labels: {
              show: !0,
              trim: !1,
              offsetX: -5,
              minHeight: void 0,
              maxHeight: 120,

              style: {
                colors: colors.mutedColor,
                cssClass: "text-muted",
                fontFamily: base.defaultFontFamily,
              },
            },
          },

          legend: {
            position: "top",
            fontFamily: base.defaultFontFamily,
            fontWeight: 400,

            labels: { colors: colors.mutedColor, useSeriesColors: !1 },
            offsetY: 10,
            markers: {
              width: 10,
              height: 10,
              strokeWidth: 0,
              strokeColor: colors.borderColor,
              fillColors: chartColors,
              radius: 6,
              customHTML: void 0,
              onClick: void 0,
              offsetX: 0,
              offsetY: 0,
            },
            itemMargin: { horizontal: 10, vertical: 0 },
            onItemClick: { toggleDataSeries: !0 },
            onItemHover: { highlightDataSeries: !0 },
          },
          fill: { opacity: 1, colors: chartColors },
          grid: {
            show: !0,
            borderColor: colors.borderColor,
            strokeDashArray: 0,
            position: "back",
            xaxis: { lines: { show: !0 } },
            yaxis: { lines: { show: !1 } },
            row: { colors: void 0, opacity: 0.5 },
            column: { colors: void 0, opacity: 0.5 },
            padding: { top: 0, right: 0, bottom: 0, left: 10 },
          },
        },
        barChartCtn = document.querySelector("#barChartdoc");
      barChartCtn &&
        (barChart = new ApexCharts(barChartCtn, barChartoptions)).render();
      $("#gpAlyts").css("visibility", "visible");
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
