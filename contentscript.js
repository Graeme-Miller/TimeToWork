function process() {
    	var minsToDest = getTime();
        var date = Date();

        var from = getTextBoxEntry("gs_tti50");
        var to = getTextBoxEntry("gs_tti51");

	chrome.runtime.sendMessage({
					minsToDest: minsToDest,
                                        from: from,
                                        to: to,
					date: date.toLocaleString()
				});
	console.log("Message sent");

	//location.reload();
}

function getTime() {
	var allCardElements = document.getElementsByClassName("cards-directions-duration cards-directions-conditions");
	var firstCardElement = allCardElements[0];
	var firstChildNode = firstCardElement.childNodes[1];
	var timeToDest = firstChildNode.textContent;
	var minsToDest = timeToDest.split(" ")[0];

        return minsToDest;
}
function getTextBoxEntry(id) {
    var element = document.getElementById(id);
    var content = element.childNodes[0].value;

    console.log(content);
}


console.log("V1")
//window.setTimeout("getTime()", 100);
window.setInterval("getTime()", 5000);
