Require("lib/geolocation");
Require("lib/pointer");
Require("lib/clickable");

var task = function (quest, title, description) {
    this.title = title;
    this.description = description;
    this.quest = quest;
    this.quest.AddTask(this);
}

task.prototype = {
    Accomplished: function () {
        this.cleanup();
        this.quest.Next();
    },

    Start: function () {
        this.cleanup();
        this.titleElement().innerHTML = this.title;
        this.descriptionElement().innerHTML = this.description;
    },

    cleanup: function () {
        this.quest.cleanup();
    },

    titleElement: function () {
        return this.quest.titleElement;
    },

    distanceElement: function () {
        return this.quest.distanceElement;
    },

    compassElement: function () {
        return this.quest.compassElement;
    },

    descriptionElement: function () {
        return this.quest.descriptionElement;
    },

    buttonsElement: function () {
        return this.quest.buttonsElement;
    },
}

var SearchTask = function (quest, title, description, targetPoint, targetTolerance, success) {
    task.call(this, quest, title, description);

    this.target = targetPoint;
    this.tolerance = targetTolerance;
    this.success = success;

    this.compassWatcher = null;
    this.locationWatcher = null;
};

SearchTask.prototype = Object.create(task.prototype);
SearchTask.prototype.constructor = SearchTask;

SearchTask.prototype.Start = function () {
    task.prototype.Start.call(this);
    var pointer = new Pointer(this.target, 1);
    var bbox = this.compassElement().getBoundingClientRect();
    pointer.Resize(bbox.width);

    this.descriptionElement().innerHTML = this.description;
    this.compassElement().appendChild(pointer.SVG());

    this.compassWatcher = compass.AddWatcher(function (heading) {
        pointer.PointTo(heading, Location.CurrentPoint());
    });

    this.locationWatcher = Location.AddWatcher(function (position) {
        var distance = Location.CurrentPoint().DistanceTo(this.target);
        this.distanceElement().innerHTML = Math.round(distance) + " ± " + position.coords.accuracy;
        if (distance < this.tolerance && position.coords.accuracy < 20) {
            this.done();
        }
    }.bind(this));
};

SearchTask.prototype.cleanup = function () {
    task.prototype.cleanup.call(this);

    if (this.locationWatcher !== null) {
        Location.RemoveWatchers([this.locationWatcher]);
        this.locationWatcher = null;
    }

    if (this.compassWatcher !== null) {
        compass.RemoveWatchers([this.compassWatcher]);
        this.compassWatcher = null;
    }
};

SearchTask.prototype.done = function () {
    this.cleanup();

    if (this.success) {
        this.success();
    }

    this.quest.Next();
};

SearchTask.prototype.getPoint = function () {
    return this.target;
};

var HiddenSearchTask = function (quest, title, description, targetPoint, targetTolerance, success) {
    SearchTask.call(this, quest, title, description, targetPoint, targetTolerance, success);
};

HiddenSearchTask.prototype = Object.create(SearchTask.prototype);
HiddenSearchTask.prototype.constructor = HiddenSearchTask;

HiddenSearchTask.prototype.Start = function () {
    task.prototype.Start.call(this);
    this.descriptionElement().innerHTML = this.description;
    
    this.locationWatcher = Location.AddWatcher(function (position) {
        var distance = Location.CurrentPoint().DistanceTo(this.target);
        this.distanceElement().innerHTML = 'Vzdálenost: <span class="red">' + Math.round(distance) + "</span> ± " + position.coords.accuracy;
        this.distanceElement
        if (distance < this.tolerance && position.coords.accuracy < 20) { // třeba 20
            this.done();
        }
    }.bind(this));
};


var DelayTask = function (quest, title, description, delay) {
    task.call(this, quest, title, description);
    this.delay = delay;
    this.timeout = null;
};

DelayTask.prototype = Object.create(task.prototype);
DelayTask.prototype.constructor = DelayTask;

DelayTask.prototype.Start = function () {
    task.prototype.Start.call(this);

    this.timeout = window.setTimeout(function() { this.Accomplished(); }.bind(this), this.delay)

};


DelayTask.prototype.cleanup = function () {
    task.prototype.cleanup.call(this);

    if (this.timeout) {
        window.clearTimeout(this.timeout);
    }
}


var TextTask = function (quest, title, description, buttonText) {
    task.call(this, quest, title, description);
    this.buttonText = buttonText;
};

TextTask.prototype = Object.create(task.prototype);
TextTask.prototype.constructor = TextTask;

TextTask.prototype.Start = function () {
    task.prototype.Start.call(this);
    

    var button = document.createElement("div");
    button.setAttribute("class", "event share");

    button.textContent = this.buttonText;
    new Clickable(button).OnClick(function () {
        this.Accomplished();
    }.bind(this));

    this.buttonsElement().appendChild(button);
};


TextTask.prototype.cleanup = function () {
    task.prototype.cleanup.call(this);
}


var FinishTask = function (quest, title, description) {
    task.call(this, quest, title, description);
};

FinishTask.prototype = Object.create(task.prototype);
FinishTask.prototype.constructor = FinishTask;

FinishTask.prototype.Start = function () {
    task.prototype.Start.call(this);
};

var LinearQuest = function () {
    this.tasks = [];
    this.currentTask = 0;

    this.key = "questPosition";
    this.mapKey = "questPoints";

    this.titleElement = document.getElementById("title");
    this.distanceElement = document.getElementById("distance");
    this.compassElement = document.getElementById("compass");
    this.descriptionElement = document.getElementById("description");
    this.buttonsElement = document.getElementById("buttons");

}

LinearQuest.prototype = {
    AddTask: function (task) {
        this.tasks.push(task);
    },
    Next: function () {
        if (this.currentTask + 1 < this.tasks.length) {
            this.tasks[this.currentTask].cleanup();
            window.localStorage.setItem(this.key, (++this.currentTask).toString());
            this.go();
        }
    },
    Previous: function () {
        if (this.currentTask > 0) {
            this.tasks[this.currentTask].cleanup();
            window.localStorage.setItem(this.key, (--this.currentTask).toString());
            this.go();
        }
    },
    Restart: function () {
        if (this.currentTask < this.tasks.length) {
            this.tasks[this.currentTask].cleanup();
        }
        this.currentTask = 0;
        window.localStorage.setItem(this.key, 0);
        this.go();
    },
    Continue: function () {
        this.currentTask = parseInt(window.localStorage.getItem(this.key));
        if (!this.currentTask) {
            this.currentTask = 0;
        }
        this.go();
    },

    go: function () {
        if (this.currentTask >= this.tasks.length) {
            this.Finish();
        } else {
            this.tasks[this.currentTask].Start();
        }
    },

    cleanup: function () {
        this.titleElement.innerHTML = "Treasure hunt";
        this.compassElement.innerHTML = "";
        this.descriptionElement.innerHTML = "Načítám další úkol...";
        this.distanceElement.innerHTML = "";
        this.buttonsElement.innerHTML = "";
    },

    map: function () {
        var locations = [];
        this.tasks.forEach(function (task, index) {
            if (typeof (task.getPoint) != 'undefined' && index <= this.currentTask) {
                var point = task.getPoint();
                locations.push({
                    position: {
                        coords: {
                            latitude: point.lat,
                            longitude: point.long,
                        },
                    },
                    text: task.title,
                });
            }
        }.bind(this));
        window.localStorage.setItem(this.mapKey, JSON.stringify(locations));
        window.location.assign("map_creator.html");
    }
}