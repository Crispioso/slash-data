function declarativeContentChrome(rule) {
   chrome.runtime.onInstalled.addListener(function(details) {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
            chrome.declarativeContent.onPageChanged.addRules([rule]);
        });
    });
}

function sendMessage(messageObject) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, messageObject, function(response) {
            var responseMessage = {};
            responseMessage[0] = response
            console.log(responseMessage);
            return responseMessage;
        });
        console.log(tabs);
    });
}

var urlMatches = chrome.runtime.getManifest().content_scripts[0].matches;
var rules = [];
var domain;

for (var i = 0; i < urlMatches.length; i++) {
    domain = urlMatches[i].match(/([a-z0-9-.]*)\.([a-z0-9-.]{2,12})/gm).toString();
    rules[i] = {
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: { hostEquals: domain }
            })
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
    };
    declarativeContentChrome(rules[i]);
}

chrome.pageAction.onClicked.addListener(function(tab) {
    var pageAction = true;
    var messageResponse = sendMessage({message: pageAction});
    // sendMessage({message: pageAction});
    console.log(messageResponse);
});

chrome.commands.onCommand.addListener(function(command) {
    var currentCommand = command;
    sendMessage({command: currentCommand});
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //     chrome.tabs.sendMessage(tabs[0].id, {command: currentCommand}, function(response) {
    //         console.log(response.action);
    //     });
    // });
});

// urlMatches.map(function(host, i){
//     // console.log(i);
//     // rules["rule_" + i] = {};
//     var domain = host.match(/([a-z0-9-.]*)\.([a-z0-9-.]{2,12})/gm).toString();
//     rules.i = {
//         conditions: [
//             new chrome.declarativeContent.PageStateMatcher({
//                 // pageUrl: { hostEquals: domain }
//             })
//         ],
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//     };
// });

// console.log(rules);

// var rule = {
//     conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: "127.0.0.1" }
//         })
//     ],
//     actions: [ new chrome.declarativeContent.ShowPageAction() ]
// };

// declarativeContentChrome(rule);
// Want to use commands and background.js more, remember this: http://stackoverflow.com/questions/29291994/can-background-page-use-window-location/29292370#29292370
