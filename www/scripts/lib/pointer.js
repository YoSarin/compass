var Pointer = function (pointLocation, scale) {
    scale = typeof scale !== 'undefined' ? scale : 1;
    this.pointLocation = pointLocation;
    this.scale = scale;
    this.lastHeading = null;
    this.lastStartPoint = null;
    this.defaultWidth = 20;

    this.needleShape = [
        [1 / 2, 2 / 3],
        [2 / 7, 5 / 6],
        [1 / 2, 1 / 8],
        [5 / 7, 5 / 6]
    ];

    this.svg = this.initSVG();
    this.Redraw();
}

Pointer.prototype = {
    PointTo: function (heading, currentLocation) {
        if (!heading || !currentLocation) {
            return;
        }
        this.lastHeading = heading;
        this.lastStartPoint = currentLocation;

        this.svg.setAttribute("width", (this.scale * this.defaultWidth).toString());
        this.svg.setAttribute("height", (this.scale * this.defaultWidth).toString());

        var line = this.svg.querySelector(".needle");
        var direction = Math.round(currentLocation.DirectionTo(this.pointLocation) - heading.magneticHeading);
        var center = ((this.defaultWidth * this.scale) / 2).toString();
        line.setAttribute("transform", "rotate(" + direction.toString() + ", " + center + ", " + center + ")");
        return;
    },

    SVG: function () {
        return this.svg;
    },

    initSVG: function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        var size = this.scale * this.defaultWidth;

        svg.setAttribute("width", size.toString());
        svg.setAttribute("height", size.toString());

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("style", "stroke:#e4e4e4;stroke-width:1;fill:#e6e6e6;");
        svg.appendChild(circle);

        var needle = document.createElementNS("http://www.w3.org/2000/svg", "path");
        needle.setAttribute("style", "stroke:#aaa;stroke-width:1;fill:#eee;");
        needle.setAttribute("class", "needle");
        svg.appendChild(needle);

        return svg;
    },

    Resize: function (width) {
        this.rescale(width / this.defaultWidth);
    },

    Redraw: function () {
        var size = this.scale * this.defaultWidth;
        var circle = this.svg.querySelector("circle");
        circle.setAttribute("cx", (size / 2).toString());
        circle.setAttribute("cy", (size / 2).toString());
        circle.setAttribute("r", (size / 3).toString());

        var needle = this.svg.querySelector(".needle");
        var path = "";
        this.needleShape.forEach(function (coords, index) {
            if (index == 0) {
                path += "M";
            } else {
                path += " L";
            }
            path += (Math.round(coords[0] * size)).toString();
            path += " ";
            path += (Math.round(coords[1] * size)).toString();
        });
        path += " Z";
        needle.setAttribute("d", path);
        if (this.lastHeading && this.lastStartPoint) {
            this.PointTo(this.lastHeading, this.lastStartPoint);
        }
    },

    rescale: function (scale) {
        this.scale = scale;
        this.Redraw();
    }
}

var pointerTest = function () {
    var p = [
        new Point(14.00, 50.00),
        new Point(14.00, 52.00),
        new Point(14.00, 48.00),
        new Point(10.00, 50.00),
        new Point(18.00, 50.00),
    ];
    for (k = 1; k <= 4; k++) {
        var pointer = new Pointer(p[k], 5);
        pointer.PointTo({ magneticHeading: 0 }, p[0]);
        document.body.appendChild(pointer.SVG());
    }
}