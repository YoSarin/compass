var Storage = {
    key: "locations",
    locations: [],
    table: document.getElementById("coords"),
    Add: function (position, text) {
        var loc = {
            "position": position,
            "text": text,
            "time": Math.floor(Date.now() / 1000)
        };
        Storage.locations.push(loc);
        Storage.showInTable(loc, Storage.locations.length-1);
        Storage.Save();
    },
    Save: function () {
        window.localStorage.setItem(Storage.key, JSON.stringify(Storage.locations));
    },
    Load: function () {
        var table = document.getElementById("coords");
        table.innerHTML = "";
        var locations = window.localStorage.getItem(Storage.key);
        if (locations) {
            Storage.locations = JSON.parse(locations);
            Storage.Redraw();
        }
    },

    showInTable: function (loc, index) {
        var t = new Date(loc["time"] * 1000);
        var timeSt = t.getDate() + ". " + (t.getMonth() + 1) + ". " + (t.getHours()) + ":" + addZero(t.getMinutes())
        var row = document.createElement("tr");
        var point = new Point(loc["position"].coords.longitude, loc["position"].coords.latitude);
        row.innerHTML = 
            "<td>" + loc["position"].coords.latitude.toString().substr(0, 6) + "</td>" +
            "<td>" + loc["position"].coords.longitude.toString().substr(0, 6) + "</td>" +
            "<td>±" + loc["position"].coords.accuracy + "</td>" +
            '<td class="distance">?</td>' +
            "<td>" + loc["text"] + "</td>" +
            "<td>" + timeSt + "</td>" +
            '<td><a class="delete event removeRow">delete</a></td>';
        row.querySelector("a.delete").addEventListener("click", function () {
            navigator.notification.confirm("Opravdu?", function (button) {
                if (button == 1) {
                    Storage.RemoveItem(index);
                }
            }, "Smazat lokaci " + loc["text"]);
        });
        Storage.table.appendChild(row);

        Location.AddWatcher(function (position) {
            row.querySelector("td.distance").innerHTML = Math.round(point.DistanceTo(new Point(position.coords.longitude, position.coords.latitude)));
        });
    },

    clearTable: function () {
        Storage.table.innerHTML = "";
    },

    Redraw: function () {
        Storage.clearTable();
        Storage.locations.forEach(function (loc, index) {
            Storage.showInTable(loc, index);
        }, Storage);
    },

    RemoveItem: function (index) {
        var loc = Storage.locations;
        Storage.locations = loc.slice(0, index);
        if (index < loc.length) {
            Storage.locations = Storage.locations.concat(loc.slice(index + 1, loc.length));
        }
        Storage.Save();
        Storage.Redraw();
    },

    Flush: function () {
        navigator.notification.confirm("Opravdu?", function (button) {
            if (button == 1) {
                Storage.clearTable();
                Storage.locations = [];
                Storage.Save();
            }
        }, "Smazat všechny souřadnice");
    },

    Share: function () {
        var text = JSON.stringify(Storage.locations);
        window.plugins.socialsharing.share(text, null, null, null);
    }
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}