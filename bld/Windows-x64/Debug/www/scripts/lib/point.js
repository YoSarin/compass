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

    DirectionTo : function (otherPoint) {
        var direction = Math.atan2(this.longDistanceTo(otherPoint), this.latDistanceTo(otherPoint));
        direction = 360 * direction / (2 * Math.PI);
        return direction;
    }
}

/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}