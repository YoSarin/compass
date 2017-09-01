// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        document.addEventListener("gps-signal-lost", function () {
            document.getElementById("nogps").style.display = "block";
        });
        document.addEventListener("gps-signal-found", function () {
            document.getElementById("nogps").style.display = "none";
        });
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        var gatherer = document.getElementById("pointgatherer");
        gatherer.style.display = "none";
        new Clickable(gatherer).OnClick(function () { window.location.assign("point_gatherer.html"); });
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

        // quest.AddTask(new SearchTask(locations.GetPoint("doma"), 120, "Jdi domů", function () { navigator.notification.alert("Jsi doma!"); }));

        var quest = new LinearQuest(function () {
            navigator.notification.alert("Výborně, teď už jen stačí najít poklad!");
        });

        quest.AddTask(new TextTask("Nazdar, jsi ready?"));
        quest.AddTask(new SearchTask(locations.GetPoint("mostek (baterka schovaná v trubce?)"), 10, "najdi mostek", function () { navigator.notification.alert("Našla jsi mostek, gratuluju!"); }));
        quest.AddTask(new SearchTask(locations.GetPoint("tři břízky"), 10, "pokračujeme dál", null));

        var travelQuest = new LinearQuest(function () {
            navigator.notification.alert("jsi v cíli!");
        });
        travelQuest.AddTask(new TextTask("Můžeme jet?"));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("mekáč"), 500, "Jedeme do mekáče", null));
        travelQuest.AddTask(new TextTask("Honem honem, najíst a můžeme pokračovat!"));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("čenkovice"), 500, "A hurá na Čenkovice", null));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("bruntál"), 500, "Opatrně přes Bruntál", null));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("chata vchod"), 10, "A hurá na chatu", null));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("mostek (baterka schovaná v trubce?)"), 10, "Otočit na mostku", null));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("chata vchod"), 10, "A vyložit věci", null));
        travelQuest.AddTask(new SearchTask(locations.GetPoint("Borovice na zahradě"), 10, "Pozdravit borovici!", null));

        var activeQuest = travelQuest;
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