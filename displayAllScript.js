google.load("visualization", "1", {packages:["corechart"]});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type != "DISPLAY_ALL_START"){
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

    var hour = parseInt(date.substring(16,18))
    var min = parseInt(date.substring(19,21))
    var sec = parseInt(date.substring(22,24))

    if(hour < 14){
      continue;
    }

    if(hour > 19){
      continue;
    }

    var row = [[hour, min ,sec], minsToDest]
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
  data2.addColumn('number', 'Time of Day');
  console.log("c")
  data2.addRows(convertedData);
  console.log("d")

  var options = {
    title: 'Drive Time',
    hAxis: {title: 'Time of Day'},
    vAxis: {title: 'Time'},
    pointSize: '3',
    legend: {position: 'right', textStyle: {color: 'black', fontSize: 16}},
    trendlines: {
          0: {
            type: 'polynomial',
            degree: 15,
            lineWidth: 3,
            opacity: 0.3,
            showR2: true,
            visibleInLegend: true,
            labelInLegend: "polynomial trendline"
          }
        }
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
  console.log("e")
  chart.draw(data2, options);
}
