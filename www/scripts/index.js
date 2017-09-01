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

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.

        var quest = new LinearQuest(function () {
            navigator.notification.alert("Výborně, teď už jen stačí najít poklad!");
        });

        new Clickable(document.getElementById("pointgatherer")).OnClick(function () { window.location.assign("point_gatherer.html"); });
        new Clickable(document.getElementById("restart")).OnClick(function () { quest.Restart() });

        Location.Watch();
        compass.Watch();

        quest.AddTask(new SearchTask(locations.GetPoint("doma"), 120, "Jdi domů", function () { navigator.notification.alert("Jsi doma!"); }));
        quest.AddTask(new SearchTask(locations.GetPoint("mostek (baterka schovaná v trubce?)"), 10, "najdi mostek", function () { navigator.notification.alert("Našla jsi mostek, gratuluju!"); }));
        quest.AddTask(new SearchTask(locations.GetPoint("tři břízky"), 10, "pokračujeme dál", null));

        quest.Continue();
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();