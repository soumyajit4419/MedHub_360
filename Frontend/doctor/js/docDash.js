const url = "https://health-automation-application.herokuapp.com";

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
  url: url + "/doc/getUserData",
  method: "GET",
  crossDomain: true,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },

  success: function (res) {
    if (res.status !== 200) {
      window.location = "../500.html";
    } else if (res.status === 200) {
      var fName = res.data.name.split(" ");
      $("#docname").html(fName[0]);
      $("#docage").html(res.data.age);
      $("#docsex").html(res.data.sex);
      $("#docuserid").html(res.data.userId);
      $("#docheight").html(`${res.data.height} Cms`);
      $("#docweight").html(`${res.data.weight} Kg`);


      sugararrf = [];
      sugararrpp = [];
      platelet = [];
      hg = [];
      rbc = [];
      var count = res.data.sugar.length;

      $("#doccount").html(count);

      var num = (count / 12) * 100;
      var n = num.toFixed(2);

      all_dates_sugar = [];
      all_dates_blood = [];

      for (var i = 0; i < res.data.sugar.length; i++) {
        sugararrf.push(res.data.sugar[i].bloodGlucoseF);
        sugararrpp.push(res.data.sugar[i].bloodGlucosePP);
      }

      for (var i = 0; i < res.data.bloodCount.length; i++) {
        platelet.push(res.data.bloodCount[i].platelateCount);
        hg.push(res.data.bloodCount[i].hemoglobin);
        rbc.push(res.data.bloodCount[i].rbcCount);
      }

      for (var i = 0; i < res.data.sugar.length; i++) {
        all_dates_sugar.push(res.data.sugar[i].date);
      }

      for (var i = 0; i < res.data.bloodCount.length; i++) {
        all_dates_blood.push(res.data.bloodCount[i].date);
      }
      console.log(all_dates_blood);
      // Sugar Chart
      var columnChart,
        columnChartoptions = {
          series: [
            {
              name: "Blood Sugar(F)",
              data: sugararrf,
            },
            {
              name: "Blood Sugar(PP)",
              data: sugararrpp,
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
            type: "datetime",
            categories: all_dates_sugar,
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
        columnChartCtn = document.querySelector("#columnChart");
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
              data: hg,
            },
            {
              name: "Platelet Count",
              data: platelet,
            },
            {
              name: "RBC Count",
              data: rbc,
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
            type: "datetime",
            categories: all_dates_blood,
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
        lineChartCtn = document.querySelector("#lineChart");
      lineChartCtn &&
        (lineChart = new ApexCharts(lineChartCtn, lineChartoptions)).render();

      //No of test chart
      var gradientRadialChart,
        gradientRadialOptions = {
          series: [n],
          chart: { height: 200, type: "radialBar", toolbar: { show: !1 } },
          plotOptions: {
            radialBar: {
              startAngle: -135,
              endAngle: 225,
              hollow: {
                margin: 0,
                size: "70%",
                background: colors.backgroundColor,
                image: void 0,
                imageOffsetX: 0,
                imageOffsetY: 0,
                position: "front",
              },
              track: {
                background: colors.backgroundColor,
                strokeWidth: "67%",
                margin: 0,
              },
              dataLabels: {
                show: !0,
                name: {
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  offsetY: -10,
                  show: !0,
                  color: colors.mutedColor,
                  fontFamily: base.defaultFontFamily,
                },
                value: {
                  formatter: function (e) {
                    return parseInt(e);
                  },
                  color: colors.headingColor,
                  fontSize: "1.53125rem",
                  fontWeight: 700,
                  fontFamily: base.defaultFontFamily,
                  offsetY: 5,
                  show: !0,
                },
                total: {
                  show: !0,
                  fontSize: "0.875rem",
                  fontWeight: 400,
                  offsetY: -10,
                  color: colors.mutedColor,
                  fontFamily: base.defaultFontFamily,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "horizontal",
              shadeIntensity: 0.5,
              gradientToColors: ["#ABE5A1"],
              inverseColors: !0,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
          stroke: { lineCap: "round" },
          labels: ["Percent"],
        },
        gradientRadial = document.querySelector("#gradientRadial");
      gradientRadial &&
        (gradientRadialChart = new ApexCharts(
          gradientRadial,
          gradientRadialOptions
        )).render();

      console.log(res.data);
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


