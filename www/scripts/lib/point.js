var Point = function (long, lat) {
    this.long = long;
    this.lat = lat;
}

Point.EarthRadius = 6371e3; // metres

Point.prototype = {
    latDistanceTo : function (otherPoint) {
        if (!this.lat || !otherPoint.lat) {
            return 0;
        }
        return Math.tan((otherPoint.lat.toRad() - this.lat.toRad()) / 2) * 2 * Point.EarthRadius;
    },

    longDistanceTo : function (otherPoint) {
        if (!this.long || !otherPoint.long) {
            return 0;
        }
        return Math.tan((otherPoint.long.toRad() - this.long.toRad()) / 2) * 2 * Point.EarthRadius;
    },

    DistanceTo : function (otherPoint) {
        // very, very, VERY approximate
        var lat = this.latDistanceTo(otherPoint);
        var long = this.longDistanceTo(otherPoint);
        return Math.sqrt(lat * lat + long * long);
    },

    DirectionTo: function (otherPoint) {
        λ1 = this.long.toRad();
        φ1 = this.lat.toRad();
        λ2 = otherPoint.long.toRad();
        φ2 = otherPoint.lat.toRad();

        var y = Math.sin(λ2 - λ1) * Math.cos(φ2);
        var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);

        var direction = Math.atan2(y, x).toDegrees();
        if (direction < 0) {
            direction = 360 + direction;
        }
        return direction;
    }
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}
if (typeof (Number.prototype.toDegrees) === "undefined") {
    Number.prototype.toDegrees = function () {
        return this * 180 / Math.PI;
    }
}

testDirections = function () {
    var p = [
        new Point(14.00, 50.00),
        new Point(14.00, 52.00),
        new Point(14.00, 48.00),
        new Point(10.00, 50.00),
        new Point(18.00, 50.00),
    ];

    console.log(p[0].DirectionTo(p[1]));
    console.log(p[0].DirectionTo(p[2]));
    console.log(p[0].DirectionTo(p[3]));
    console.log(p[0].DirectionTo(p[4]));
}