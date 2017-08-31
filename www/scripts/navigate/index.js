// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', function() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var container = document.getElementById("svgContainer");
        var box = container.getBoundingClientRect();
        var target = Storage.NavigateTo();
        var point = new Point(target.coords.longitude, target.coords.latitude);
        var pointer = new Pointer(target, 1);

        pointer.Resize(box.width);
        container.appendChild(pointer.SVG());

        Location.Watch();
        compass.Watch();

        Location.AddWatcher(function (position) {
            document.getElementById("distance").innerHTML = Math.round(point.DistanceTo(new Point(position.coords.longitude, position.coords.latitude)));
        });

        compass.AddWatcher(function (heading) {
            pointer.PointTo(heading, Location.CurrentPoint());
        });

        new Clickable(document.getElementById("return")).OnClick(function () { window.location.assign("index.html"); });
    }.bind(this), false);

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();