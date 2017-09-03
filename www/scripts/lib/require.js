var Require = function (package) {
    var scriptName = 'scripts/' + package + ".js";
    var scripts = document.getElementsByTagName("script");
    for (k = 0; k < scripts.length; k++) {
        if (scripts[k].getAttribute("src") == scriptName) {
            return;
        }
    }
    var script = document.createElement("script");
    script.setAttribute("src", scriptName);
    document.body.appendChild(script);
}