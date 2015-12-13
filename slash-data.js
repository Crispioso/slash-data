$(function() {
    var keys = [];
    $(document).keydown(function(e) {
        keys[e.keyCode] = true;
    }).keyup(function(e) {
      if (keys[16] && keys[17] && keys[85]) {
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
      keys[e.keyCode] = false;
    });
})