﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        Location.Watch();
        compass.Watch();

        Storage.Load();

        new Clickable(document.getElementById("location")).OnClick(Location.Record);
        new Clickable(document.getElementById("flushAll")).OnClick(Storage.Flush);
        new Clickable(document.getElementById("share")).OnClick(Storage.Share);
        new Clickable(document.getElementById("mapCreator")).OnClick(function () { window.open("map_creator.html", "_self"); });
    };

    function onPause() {
        Location.Stop();
        Storage.Save();
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        Location.Watch();
        Storage.Load();
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();