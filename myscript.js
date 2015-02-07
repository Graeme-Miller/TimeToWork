function clearData(from, to)  {
	console.log("clearData", decodeURI(from),decodeURI(to))
	chrome.runtime.sendMessage({type: "CLEAR_DATA", from: decodeURI(from), to: decodeURI(to)});
}

function downloadData(from, to)  {
	var subData = data[decodeURI(from)][decodeURI(to)];

	var csvData = "data:text/csv;charset=utf-8,"

	for(var row in Object.keys(subData).sort()){

		var rowData = subData[row]
		console.log(rowData)
		var sortedRowData = Object.keys(rowData).sort()
		console.log("sortedRowData", sortedRowData)

		for(var key in sortedRowData){   //subData[row]
			  var content = subData[row][sortedRowData[key]].replace(/\,/g, "-")
				csvData += content + ","
		}

		csvData += "\n"
	}

	var link = document.createElement("a");
	link.setAttribute("href", encodeURI(csvData));
	link.setAttribute("download", "my_data.csv");

	link.click();
}

var data = {};
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		if(request.type != "BACKGROUND_DATA_UPDATED"){
				return;
		}

		console.log("rendering")

		data = request.data
		var table = document.getElementById("myTable");

		for(var i = table.rows.length - 1; i > 0; i--){
				table.deleteRow(i);
		}


		for(var from in data){
				for(var to in data[from]){
					var row = table.insertRow(1);

					var cell1 = row.insertCell(0);
					var cell2 = row.insertCell(1);
					var cell3 = row.insertCell(2);
					var cell4 = row.insertCell(3);
					var cell5 = row.insertCell(4);
					var cell6 = row.insertCell(5);
					var cell7 = row.insertCell(6);

					cell1.innerHTML = from;
					cell2.innerHTML = to;
					cell3.innerHTML = data[from][to].length;

					var encodedFrom = encodeURI(from)
					var encodedTo = encodeURI(to)

					cell4.innerHTML = "<button id=clear"+encodedFrom+encodedTo+">Clear</button>"
					document.getElementById("clear"+encodedFrom+encodedTo).addEventListener("click",
					function() {clearData(encodedFrom, encodedTo)});

					cell5.innerHTML = "<button id=down"+encodedFrom+encodedTo+">Download</button>"
					document.getElementById("down"+encodedFrom+encodedTo).addEventListener("click",
					function() {downloadData(encodedFrom, encodedTo)});


					var linkDir = ""
					if(data[from][to].length > 0){
						console.log("trying to get url", data[from][to].url, data[from][to])
						linkDir = data[from][to][0].url
					}

					cell6.innerHTML = "<button id=link"+encodedFrom+encodedTo+">Open</button>"
					document.getElementById("link"+encodedFrom+encodedTo).addEventListener("click",
					function() {
						chrome.tabs.create({
							'url': linkDir
						});

					});

					cell7.innerHTML = "<button id=display"+encodedFrom+encodedTo+">Display</button>"
					document.getElementById("display"+encodedFrom+encodedTo).addEventListener("click",
					function() {
						chrome.tabs.create({
							'url': 'display.html'
						});

						chrome.runtime.sendMessage({type: "DISPLAY_START", data: data[from][to]});

					});
			}
		}
	});


	chrome.runtime.sendMessage({type: "SCRIPT_START"});
