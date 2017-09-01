var task = function () {
    this.quest = null;

    this.distanceElement = document.getElementById("distance");
    this.compassElement = document.getElementById("compass");
    this.descriptionElement = document.getElementById("description");
    this.buttonsElement = document.getElementById("buttons");
}

task.prototype = {
    SetQuest: function (quest) {
        if (this.quest != null) {
            return false;
        }
        this.quest = quest;
        return true;
    },

    Accomplished: function () {
        this.cleanup();
        this.quest.Next();
    },

    cleanup: function () {
        this.compassElement.innerHTML = "";
        this.descriptionElement.innerHTML = "Načítám další úkol...";
        this.distanceElement.innerHTML = "";
        this.buttonsElement.innerHTML = "";
    }
}

var SearchTask = function (targetPoint, targetTolerance, description, success) {
    task.call(this);

    this.target = targetPoint;
    this.tolerance = targetTolerance;
    this.description = description;
    this.success = success;

    this.compassWatcher = null;
    this.locationWatcher = null;
};

SearchTask.prototype = Object.create(task.prototype);
SearchTask.prototype.constructor = SearchTask;

SearchTask.prototype.Start = function () {
    var pointer = new Pointer(this.target, 1);
    var bbox = this.compassElement.getBoundingClientRect();
    pointer.Resize(bbox.width);

    this.descriptionElement.innerHTML = this.description;
    this.compassElement.appendChild(pointer.SVG());

    this.compassWatcher = compass.AddWatcher(function (heading) {
        pointer.PointTo(heading, Location.CurrentPoint());
    });

    this.locationWatcher = Location.AddWatcher(function (position) {
        var distance = Location.CurrentPoint().DistanceTo(this.target);
        this.distanceElement.innerHTML = Math.round(distance) + " ± " + position.coords.accuracy;
        if ((distance - position.coords.accuracy) < this.tolerance && position.coords.accuracy < this.tolerance) {
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

var TextTask = function (description) {
    task.call(this);

    this.description = description;
};

TextTask.prototype = Object.create(task.prototype);
TextTask.prototype.constructor = TextTask;

TextTask.prototype.Start = function () {
    this.descriptionElement.innerHTML = this.description;
    var button = document.createElement("div");
    button.setAttribute("class", "event share");
    button.textContent = "Jasný, jedem dál!";
    new Clickable(button).OnClick(function () {
        this.Accomplished();
    }.bind(this));

    this.buttonsElement.appendChild(button);
};

var LinearQuest = function (finishCallback) {
    this.tasks = [];
    this.currentTask = 0;
    this.finish = finishCallback;

    this.key = "questPosition";
}

LinearQuest.prototype = {
    AddTask: function (task) {
        if (task.SetQuest(this)) {
            this.tasks.push(task);
            return true;
        }
        return false;
    },
    Next: function () {
        window.localStorage.setItem(this.key, (++this.currentTask).toString());
        this.go();
    },
    Restart: function () {
        this.tasks[this.currentTask].cleanup();
        this.currentTask = 0;
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
    }
}