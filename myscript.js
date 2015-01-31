console.log("Heyo World!");

var syncRun = false;
var data = [];

var fromSelected = ""
var toSelected = ""

function clearData()  {
	chrome.storage.sync.clear();
	data = [];
	render();
}

function render(){
	var table = document.getElementById("myTable");

	for(var i = table.rows.length - 1; i > 0; i--){
	    table.deleteRow(i);
	}


	data[fromSelected][toSelected].forEach(function(i){
		var row = table.insertRow(1);

		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);

		cell1.innerHTML = i.date;
		cell2.innerHTML = i.minsToDest;

	});
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
        data[from][to][data.length] = request;

	chrome.storage.sync.set({"appData": data});
	render();

    }
  });



chrome.storage.sync.get("appData", function(localData){
	if(localData.appData) {
		data = localData.appData;
	}
	syncRun = true;
	//render();
        document.getElementById("myButton").addEventListener("click",clearData); //HORRIBLE HORRIBLE HACK
});
