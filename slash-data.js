$(function() {
    var keys = [];
    $(document).keydown(function(e) {
        keys[e.keyCode] = true;
    }).keyup(function(e) {
        if (keys[16] && keys[17] && keys[85]) {
            var path = window.location.protocol + "//" + window.location.host + window.location.pathname,
                params = window.location.search,
                data = "data";

            if (!path.match("/$")) {
                data = "/data";
            }
            if (!path.match("data")) {
                console.log(path);
                console.log(data);
                console.log(params);
                window.location.href = path + data + params;
            } else {
                path = path.replace("/data", "/");
                console.log(path);
                console.log(params);
                window.location.href = path + params;
            }
        }
        keys[e.keyCode] = false;
    });
});