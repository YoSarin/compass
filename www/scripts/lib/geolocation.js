Require("lib/point");

var Location = {
    watchID: null,
    current: null,
    lastChange: new Date(),

    status: "inactive",

    watchers: [],

    timer: null,

    CurrentPoint: function () {
        if (Location.current === null) {
            return new Point(0, 0);
        }
        return new Point(Location.current.coords.longitude, Location.current.coords.latitude);
    },

    AddWatcher: function(watcher) {
        Location.watchers.push(watcher);
        return Location.watchers.length - 1;
    },

    Watch: function () {
        if (Location.watchID != null) {
            return;
        }
        Location.watchID = navigator.geolocation.watchPosition(Location.success, Location.error, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
        if (Location.timer == null) {
            Location.timer = window.setTimeout(Location.reset, 5000);
        }
    },

    Record: function () {
        if (Location.current == null) {
            return;
        }
        navigator.notification.prompt("Zadej popisek", function (res) {
            if (res.buttonIndex != 1) {
                return;
            }
            Storage.Add(Location.current, res.input1);
        });
    },

    reset: function () {
        try {
            Location.status = "inactive";
            document.dispatchEvent(new CustomEvent("gps-signal-lost"));
            Location.Stop();
            Location.Watch();
        } catch (e) {
            new ErrorHandler(e).Save().ReThrow();
        }
    },

    success: function (position) {
        try {
            if (position.coords.accuracy > 30) {
                return;
            }

            if (Location.lastChange >= position.timestamp) {
                return;
            }

            Location.lastChange = position.timestamp;

            if (Location.timeout) {
                window.clearTimeout(Location.timeout);
            }

            Location.timer = window.setTimeout(Location.reset, 5000);

            Location.current = position;
            document.dispatchEvent(new CustomEvent("gps-signal-ok"));

            Location.watchers.forEach(function (watcher, idx) {
                watcher(position);
            });

        } catch (e) {
            new ErrorHandler(e).Save().ReThrow();
        }
    },

    error: function (err) {
        // navigator.notification.alert('code: ' + err.code + '\n' + 'message: ' + err.message + '\n');
        Location.reset();
    },

    Stop: function () {
        if (Location.watchID != null) {
            navigator.geolocation.clearWatch(Location.watchID);
            Location.watchID = null;
        }
    },

    RemoveWatchers: function (indexes) {
        indexes.sort(function (a, b) { return b - a; });
        indexes.forEach(function (val, index) {
            Location.watchers.splice(val, 1);
        });
    }
}