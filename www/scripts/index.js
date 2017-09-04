// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    Require("lib/error_handler");
    Require("lib/clickable");
    Require("lib/quest");
    Require("lib/geolocation");
    Require("lib/compass");
    Require("data/locations");
    Require("data/quest_praha");

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var colors = [
        "#4f4",
        "#2d2",
        "#0b0",
        "#290",
        "#470",
        "#650",
        "#830",
        "#a22",
        "#c44",
        "#e66",
    ];

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var gpsStatus = document.getElementById("gps_status");
        var compassStatus = document.getElementById("compass_status");

        document.addEventListener("gps-signal-ok", function () {
            gpsStatus.style.backgroundColor = "#4f4";
            gpsStatus.setAttribute("failed", 0);
        });
        document.addEventListener("compass-signal-ok", function () {
            compassStatus.style.backgroundColor = "#4f4";
            compassStatus.setAttribute("failed", 0);
        });
        window.setInterval(function () {
            [compassStatus, gpsStatus].forEach(function (el, idx) {
                var value = parseInt(el.getAttribute("failed"));
                el.setAttribute("failed", value + 1);
                var color = colors[colors.length - 1];
                if (value < colors.length) {
                    color = colors[value];
                }
                el.style.backgroundColor = color;
            });
        }, 1000);
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        new Clickable(document.getElementById("title")).OnMultiClick(function () {
            document.getElementById("cheat").setAttribute("class", "");
        }, 5);

        new Clickable(document.getElementById("status")).OnClick(function () {
            Location.Stop();
            compass.Stop();
            Location.Watch();
            compass.Watch();
        }, 5);

        new Clickable(document.getElementById("status")).OnMultiClick(function () {
            ErrorHandler.Toggle();
        }, 5);

        new Clickable(document.getElementById("pointgatherer")).OnClick(function () { window.location.assign("point_gatherer.html"); });
        new Clickable(document.getElementById("map")).OnClick(function () { activeQuest.map(); });
        new Clickable(document.getElementById("next")).OnClick(function () { activeQuest.Next(); });
        new Clickable(document.getElementById("prev")).OnClick(function () { activeQuest.Previous(); });
        new Clickable(document.getElementById("restart")).OnClick(function () {
            navigator.notification.confirm(
                "Fakt se chceš vrátit úplně na začátek?",
                function (button) {
                    if (button == 1) {
                        activeQuest.Restart();
                    }
                },
                "Restartovat",
                ["Ano", "NE!"]
            );
        });

        Location.Watch();
        compass.Watch();

        var activeQuest = Quest.Load(prahaQuest());
        activeQuest.Continue();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
        Location.Stop();
        compass.Stop();
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.        
        Location.Watch();
        compass.Watch();
    };
})();