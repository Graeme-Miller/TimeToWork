google.load("visualization", "1", {packages:["corechart"]});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type != "DISPLAY_START"){
        return;
    }

    drawChart(request.data);
  }
  );



function convertData(data){

  var result = []

  for (x in data) {

    var date = data[x].date

    var minsToDest = parseInt(data[x].minsToDest)
    var day = date.substring(0, 3)

    var hour = parseInt(date.substring(16,18))
    var min = parseInt(date.substring(19,21))
    var sec = parseInt(date.substring(22,24))

    var row = [[hour, min ,sec], null, null, null, null, null, null, null]



    var dayIndex = null
    switch(day) {
        case 'Mon': dayIndex = 1; break;
        case 'Tue': dayIndex = 2; break;
        case 'Wed': dayIndex = 3; break;
        case 'Thu': dayIndex = 4; break;
        case 'Fri': dayIndex = 5; break;
        case 'Sat': dayIndex = 6; break;
        case 'Sun': dayIndex = 7; break;
        default: continue;
    }

    row[dayIndex] = minsToDest
    result[result.length] = row
  }

  console.log(result)
  return result

}

function drawChart(data) {
  var convertedData = convertData(data)

  console.log("a")
  var data2 = new google.visualization.DataTable();
  console.log("b")
  data2.addColumn('timeofday', 'Time');
  data2.addColumn('number', 'Monday');
  data2.addColumn('number', 'Tuesday');
  data2.addColumn('number', 'Wednessday');
  data2.addColumn('number', 'Thursday');
  data2.addColumn('number', 'Friday');
  data2.addColumn('number', 'Saturday');
  data2.addColumn('number', 'Sunday');
  console.log("c")
  data2.addRows(convertedData);
  console.log("d")

  var options = {
    title: 'Drive Time',
    hAxis: {title: 'Time of Day'},
    vAxis: {title: 'Time', minValue: 0, maxValue: 15},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  console.log("e")
  chart.draw(data2, options);
}
