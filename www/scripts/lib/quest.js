var SearchTask = function (targetPoint, targetTolerance, description, success) {
    this.target = targetPoint;
    this.tolerance = targetTolerance;
    this.description = description;

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
        var distanceElement = document.getElementById("distance");
        var compassElement = document.getElementById("compass");
        var bbox = compassElement.getBoundingClientRect();
        pointer.Resize(bbox.width);

        document.getElementById("description").innerHTML = this.description;
        compassElement.appendChild(pointer.SVG());

        this.compassWatcher = compass.AddWatcher(function (heading) {
            pointer.PointTo(heading, Location.CurrentPoint());
        });

        this.locationWatcher = Location.AddWatcher(function (position) {
            var distance = Location.CurrentPoint().DistanceTo(this.target);
            distanceElement.innerHTML = Math.round(distance);
            if (distance < this.targetTolerance) {
                this.done();
            }
        }.bind(this));
    },

    done: function () {
        Location.RemoveWatchers([this.locationWatcher]);
        this.locationWatcher = null;

        compass.RemoveWatchers([this.compassWatcher]);
        this.compassWatcher = null;

        if (this.success) {
            this.success();
        }

        this.quest.Next();
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
        window.localStorage.setItem(this.key, (++this.currentTask).toString);
        this.go();
    },
    Start: function () {
        this.currentTask = 0;
        this.go();
    },
    LoadPosition: function () {
        this.currentTask = window.localStorage.getItem(this.key);
        if (!this.currentTask) {
            this.currentTask = 0;
        }
    },
    go: function () {
        if (this.currentTask >= this.tasks.length) {
            this.Finish();
        } else {
            this.tasks[this.currentTask].Start();
        }
    }
}