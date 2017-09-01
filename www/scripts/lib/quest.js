var SearchTask = function (targetPoint, targetTolerance, description, success) {
    this.target = targetPoint;
    this.tolerance = targetTolerance;
    this.description = description;
    this.success = success;

    this.distanceElement = document.getElementById("distance");
    this.compassElement = document.getElementById("compass");
    this.descriptionElement = document.getElementById("description");

    this.compassWatcher = null;
    this.locationWatcher = null;

    this.list = null;
}

SearchTask.prototype = {
    SetQuest: function (quest) {
        if (this.quest != null) {
            return false;
        }
        this.quest = quest;
        return true;
    },

    Start: function () {
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
            this.distanceElement.innerHTML = Math.round(distance) + " ± " + position.coords.accuracy ;
            if (distance < this.tolerance) {
                this.done();
            }
        }.bind(this));
    },

    done: function () {
        this.cleanup();

        if (this.success) {
            this.success();
        }

        this.quest.Next();
    },

    cleanup: function () {
        if (this.locationWatcher !== null) {
            Location.RemoveWatchers([this.locationWatcher]);
            this.locationWatcher = null;
        }

        if (this.compassWatcher !== null) {
            compass.RemoveWatchers([this.compassWatcher]);
            this.compassWatcher = null;
        }

        this.compassElement.innerHTML = "";
        this.descriptionElement.innerHTML = "Načítám další úkol...";
        this.distanceElement.innerHTML = "";
    },

    Accomplished: function () {
        this.quest.Next();
    },
}

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