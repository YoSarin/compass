var Location = {
    watchID: null,
    current: null,

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
        Location.timer = window.setTimeout(Location.reset, 5000);
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
        Location.status = "inactive";
        document.dispatchEvent(new CustomEvent("gps-signal-lost"));
        Location.Stop();
        Location.Watch();
    },

    success: function (position) {
        window.clearTimeout(Location.timeout);
        Location.timer = window.setTimeout(Location.reset, 5000);

        Location.current = position;
        if (Location.status != "active") {
            document.dispatchEvent(new CustomEvent("gps-signal-found"));
            Location.status = "active";
        }

        Location.watchers.forEach(function (watcher, idx) {
            watcher(position);
        });
    },

    error: function (err) {
        alert('code: ' + err.code + '\n' + 'message: ' + err.message + '\n');
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