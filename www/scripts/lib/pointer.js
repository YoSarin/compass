var Pointer = function (pointLocation, scale) {
    scale = typeof scale !== 'undefined' ? scale : 1;
    this.pointLocation = pointLocation;
    this.scale = scale;
    this.lastHeading = null;
    this.lastStartPoint = null;
    this.defaultWidth = 20;

    this.svg = this.initSVG();
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

        var line = this.svg.querySelector("line");
        var direction = Math.round(currentLocation.DirectionTo(this.pointLocation) - heading.magneticHeading);
        var x = this.pointX(direction);
        var y = this.pointY(direction);
        line.setAttribute("x2", x.toString());
        line.setAttribute("y2", y.toString());
        /*
        var north = this.svg.querySelector(".north");
        direction = Math.round(360 - heading.magneticHeading);
        x = this.pointX(direction);
        y = this.pointY(direction);
        north.setAttribute("x2", x.toString());
        north.setAttribute("y2", y.toString());

        var asimute = this.svg.querySelector(".asimute");
        direction = Math.round(currentLocation.DirectionTo(this.pointLocation));
        x = this.pointX(direction);
        y = this.pointY(direction);
        asimute.setAttribute("x2", x.toString());
        asimute.setAttribute("y2", y.toString());
        */
    },

    SVG: function () {
        return this.svg;
    },

    pointX: function (directionInDegrees) {
        var angleInRadians = directionInDegrees.toRad();
        var radius = (this.defaultWidth / 2) * this.scale;

        return radius + Math.round(radius * Math.sin(angleInRadians));
    },

    pointY: function (directionInDegrees) {
        var angleInRadians = directionInDegrees.toRad();
        var radius = (this.defaultWidth / 2) * this.scale;

        return radius - Math.round(radius * Math.cos(angleInRadians));
    },

    initSVG: function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        var size = this.scale * this.defaultWidth;

        svg.setAttribute("width", size.toString());
        svg.setAttribute("height", size.toString());

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", (size / 2).toString());
        circle.setAttribute("cy", (size / 2).toString());
        circle.setAttribute("r", (size / 3).toString());
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("fill", "white");
        svg.appendChild(circle);

        var pointer = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pointer.setAttribute("x1", (size / 2).toString());
        pointer.setAttribute("y1", (size / 2).toString());
        pointer.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:1");
        svg.appendChild(pointer);

        /*
        var northPointer = document.createElementNS("http://www.w3.org/2000/svg", "line");
        northPointer.setAttribute("class", "north");
        northPointer.setAttribute("x1", (size / 2).toString());
        northPointer.setAttribute("y1", (size / 2).toString());
        northPointer.setAttribute("style", "stroke:rgb(40,40,40);stroke-width:1");
        svg.appendChild(northPointer);

        var asimute = document.createElementNS("http://www.w3.org/2000/svg", "line");
        asimute.setAttribute("class", "asimute");
        asimute.setAttribute("x1", (size / 2).toString());
        asimute.setAttribute("y1", (size / 2).toString());
        asimute.setAttribute("style", "stroke:rgb(0,0,255);stroke-width:1");
        svg.appendChild(asimute);
        */
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

        var pointer = this.svg.querySelector("line");
        pointer.setAttribute("x1", (size / 2).toString());
        pointer.setAttribute("y1", (size / 2).toString());
        /*
        var northPointer = this.svg.querySelector(".north");
        northPointer.setAttribute("x1", (size / 2).toString());
        northPointer.setAttribute("y1", (size / 2).toString());

        var asimute = this.svg.querySelector(".asimute");
        asimute.setAttribute("x1", (size / 2).toString());
        asimute.setAttribute("y1", (size / 2).toString());
        */
        this.PointTo(this.lastHeading, this.lastStartPoint);
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