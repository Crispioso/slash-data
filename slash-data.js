chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var newCommand = request.command;
    console.log("Received command: " + newCommand);
    
    if (newCommand === "json") {
        var path = window.location.protocol + "//" + window.location.host + window.location.pathname,
        params = window.location.search,
        data = "data",
        urlEnd = path.match('[^/]+(?=/$|$)');
        
        if (!path.match("/$")) {
            data = "/data";
        }
        
        if (urlEnd[0] !== 'data') {
            window.location.href = path + data + params;
        } else {
            var lastSlash = path.lastIndexOf("/");
            path = path.substring(0,lastSlash);
            window.location.href = path + params;
        }
    }
    
    sendResponse({"action": "Actioned trigger: " + newCommand});
});
