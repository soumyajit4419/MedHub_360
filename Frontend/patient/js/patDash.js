const url = "http://127.0.0.1:3600";

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

$.ajax({
  url: url + "/user/getUserData",
  method: "GET",
  crossDomain: true,
  headers: {
    "x-access-token": localStorage.getItem("token"),
  },

  success: function (res) {
    if (res.status !== 200) {
      window.location = "../500.html";
    } else if (res.status === 200) {
      $('#patname').html(res.data.name);
      $('#patage').html(res.data.age);
      $('#patsex').html(res.data.sex);
      $('#patuserid').html(res.data.userId);
      $('#patheight').html(`${res.data.height} Cms`);
      $('#patweight').html(`${res.data.height} Kg`);
     

      sugararrf = [];
      sugararrpp = [];
      platelet = [];
      hg=[];
      rbc=[];
      var count=res.data.sugar.length;

      $('#patcount').html(count);

      var num=(count/12)*100;
      var n = num.toFixed(2);

      if(count<12){
        gradientRadialChart.updateSeries([
          n
        ])
      }

      all_dates_sugar=[];
      all_dates_blood=[];

      for (var i=0; i < res.data.sugar.length; i++) { 
            sugararrf.push(res.data.sugar[i].bloodGlucoseF);
            sugararrpp.push(res.data.sugar[i].bloodGlucosePP); 
      }

      for (var i=0; i < res.data.bloodCount.length; i++) { 
          platelet.push(res.data.bloodCount[i].platelateCount);
          hg.push(res.data.bloodCount[i].hemoglobin); 
         rbc.push(res.data.bloodCount[i].rbcCount);
      }

      
      for (var i=0; i < res.data.sugar.length; i++) { 
        all_dates_sugar.push(res.data.sugar[i].date);
      }

      for (var i=0; i < res.data.bloodCount.length; i++) { 
      all_dates_blood.push(res.data.bloodCount[i].date);
      }

      
      columnChart.updateOptions({
        xaxis: {
          type: "datetime",
          categories: all_dates_sugar}
      })
      
      
      columnChart.updateSeries([{
        name: 'Blood Sugar(F)',
        data: sugararrf
      }, {
        name: 'Blood Sugar(PP)',
        data: sugararrpp
      }])



   
      lineChart.updateOptions({
        xaxis: {
          type: "datetime",
          categories:  all_dates_blood}
      })


 
      // console.log(sugararrf);
      // console.log(sugararrpp);

      lineChart.updateSeries([{
        name: 'Haemoglobin',
        data: hg
      },{
        name: 'Platelet Count',
        data: platelet
      }, {
       name: 'RBC Count',
      data: rbc
      }
    ])

      console.log(res.data);
    }
    
  },
  error: function (err) {
    console.log(err);
    alert(err);
  },
});
