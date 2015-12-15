chrome.commands.onCommand.addListener(function(command) {
    var currentCommand = command;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {command: currentCommand}, function(response) {
            console.log(response.action);
        });
    });
});

// Want to use commands and background.js more, remember this: http://stackoverflow.com/questions/29291994/can-background-page-use-window-location/29292370#29292370