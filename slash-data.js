chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var newCommand = request.command;
    console.log("Received command: " + newCommand);
    
    if (newCommand === "json") {
        var path = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            var params = window.location.search;
            var data = "data";
            
            if (!path.match("/$")) {
                data = "/data";
            }
            if (!path.match("data")) {
                window.location.href = path + data + params;
            } else {
                path = path.replace("/data", "/");
                window.location.href = path + params;
            }
    }
    
    sendResponse({"action": "Actioned trigger: " + newCommand});
});