var syncRun = false;
var data = {};

function clearData()  {
  chrome.storage.sync.clear();
  data = {};
  sendState();
}

function sendState() {
  chrome.runtime.sendMessage({type: "BACKGROUND_DATA_UPDATED", data: data});
}

function saveState(){
  var toBeSaved= {};
  toBeSaved["appData"] = data
  chrome.storage.local.set(toBeSaved);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
        if(request.type != "CLEAR_DATA"){
            return;
        }

        var from = request.from;
        var to = request.to;

        delete data[from]
        saveState();
        sendState();
  });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.type != "SCRIPT_START"){
        return;
    }

    sendState();
  }
  );

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if(syncRun && request.type == "TIME_TO_DEST"){

        var from = request.from;
        var to = request.to;
        var url = request.url


        if(!data[from]) {
            data[from] = {};
        }
        if(!data[from][to]){
            data[from][to] = [];
        }

        data[from][to][data[from][to].length] = request;

        saveState();
        sendState();
    }
  });



chrome.storage.local.get("appData", function(localData){
  var recoveredData = localData.appData;

  console.log("localData", localData)
  console.log("here have some data", data)
  if(recoveredData) {
    console.log("setting data to this", recoveredData)
    data = recoveredData;
  }
  console.log("here have some data2", data)
  syncRun = true;
  console.log("loaded")
  sendState()

});
