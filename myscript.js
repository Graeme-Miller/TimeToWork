console.log("Heyo World!");

var syncRun = false;
var data = {};


function clearData()  {
	chrome.storage.sync.clear();
	data = {};
	render();
}

function render(){
	var table = document.getElementById("myTable");

	for(var i = table.rows.length - 1; i > 0; i--){
	    table.deleteRow(i);
	}

	console.log("Render Data",data)

	for(var from in data){
			for(var to in data[from]){
				var row = table.insertRow(1);

				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = from;
				cell2.innerHTML = to;
				cell3.innerHTML = data[from][to].length;
			}
	}
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(syncRun){
        var from = request.from;
        var to = request.to;


        if(!data[from]) {
            data[from] = {};
        }
        if(!data[from][to]){
            data[from][to] = [];
        }

        data[from][to][data[from][to].length] = request;

				var toBeSaved= {};
				toBeSaved["appData"] = data
				chrome.storage.sync.set(toBeSaved);
				render();

    }
  });



chrome.storage.sync.get("appData", function(localData){
	var recoveredData = localData.appData;

	console.log("localData", localData)
	console.log("here have some data", data)
	if(recoveredData) {
		console.log("setting data to this", recoveredData)
		data = recoveredData;
	}
	console.log("here have some data2", data)
	syncRun = true;
	render();
  document.getElementById("myButton").addEventListener("click",clearData); //HORRIBLE HORRIBLE HACK
});
