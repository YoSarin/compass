var Compass = function () {
    this.watchID = null;
    this.watchers = [];
};

Compass.prototype = {
    Watch: function () {
        if (this.watchID !== null) {
            return;
        }
        this.watchID = navigator.compass.watchHeading(this.success.bind(this), this.error.bind(this), { frequency: 2500 });
    },

    Stop: function() {
        if (this.watchID !== null) {
            navigator.compass.clearWatch(this.watchID);
            this.watchID = null;
        }
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
 
    success: function (heading) {
        this.watchers.forEach(function (watcher, idx) {
            watcher(heading);
        });
    },

    error: function (err) {
        if (err.code == 3) { // compass is not in device
            alert("Zařízení nemá kompas.");
        } else {
            alert("Chyba kompasu: " + err.code + '\n(kompas vypínám)');
        }
        this.Stop();
    },
}

var compass = new Compass();