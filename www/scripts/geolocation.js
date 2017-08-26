﻿var Location = {
    watchID: null,
    current: null,

    watchers: [],

    AddWatcher: function(watcher) {
        Location.watchers.push(watcher);
    },

    Watch: function () {
        if (Location.watchID != null) {
            return;
        }
        Location.watchID = navigator.geolocation.watchPosition(Location.success, Location.error, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
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

    success: function (position) {
        Location.watchers.forEach(function (watcher, idx) {
            watcher(position);
        })

    },

    error: function (err) {
        alert('code: ' + err.code + '\n' + 'message: ' + err.message + '\n');
    },

    Stop: function () {
        if (Location.watchID != null) {
            navigator.geolocation.clearWatch(Location.watchID);
            Location.watchID = null;
        }
    }
}

Location.AddWatcher(function (position) {
    Location.current = position;
});

Location.AddWatcher(function (position) {
    var element = document.getElementById("location");
    style = window.getComputedStyle(element);
    if (element.style.backgroundColor != "cornflowerBlue") {
        element.style.backgroundColor = "cornflowerBlue";
    } else {
        element.style.backgroundColor = "darkCyan";
    }
    element.innerHTML = position.coords.latitude.toString().substring(0, 6) + ':' +
                        position.coords.longitude.toString().substring(0, 6) + '@' +
                        '[±' + position.coords.accuracy + ']';
});