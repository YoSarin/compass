var Compass = function () {
    this.watchID = null;
    this.watchers = [];
    this.timer = null;
};

Compass.prototype = {
    Watch: function () {
        if (this.watchID !== null) {
            return;
        }
        if (navigator.compass) {
            this.watchID = navigator.compass.watchHeading(this.success.bind(this), this.error.bind(this), { frequency: 300 });
            this.inactivityTimer();
        }
    },

    Stop: function () {
        if (this.watchID !== null) {
            navigator.compass.clearWatch(this.watchID);
            this.watchID = null;
        }
        window.clearTimeout(this.timer);
    },

    AddWatcher: function (callback) {
        this.watchers.push(callback);
        return this.watchers.length - 1;
    },

    RemoveWatchers: function (indexes) {
        var self = this;
        indexes.sort(function (a, b) { return b - a; });
        indexes.forEach(function (val, index) {
            self.watchers.splice(val, 1);
        });
    },

    inactivityTimer: function () {
        if (this.timer != null) {
            window.clearTimeout(this.timer);
        }
        if (this.timer == null) {
            this.timer = window.setTimeout(this.reset.bind(this), 5000);
        }
    },

    reset: function () {
        this.Stop();
        this.Watch();
    },
 
    success: function (heading) {
        this.inactivityTimer();
        document.dispatchEvent(new CustomEvent("compass-signal-ok"));
        this.watchers.forEach(function (watcher, idx) {
            watcher(heading);
        });
    },

    error: function (err) {
        if (err.code == 3) { // compass is not in device
            navigator.notification.alert("Zařízení nemá kompas.");
        } else {
            navigator.notification.alert("Chyba kompasu: " + err.code + '\n(kompas vypínám)');
        }
        this.Stop();
    },
}

var compass = new Compass();