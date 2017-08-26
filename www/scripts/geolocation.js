var Location = {
    watchID: null,
    ticks: 0,
    current: null,

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
        if (!Location.ticks) {
            Location.ticks = 0;
        }
        console.log(Location.ticks);
        Location.current = position;
        var element = document.getElementById("location");
        style = window.getComputedStyle(element);
        if (element.style.backgroundColor != "cyan") {
            element.style.backgroundColor = "cyan";
        } else {
            element.style.backgroundColor = "darkCyan";
        }
        element.innerHTML = 'Lat:' + position.coords.latitude.toString().substring(0, 5) + ' ' +
                            'Long: ' + position.coords.longitude.toString().substring(0, 5) +
                            ' [±' + position.coords.accuracy + ']';

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