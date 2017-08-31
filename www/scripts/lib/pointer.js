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

        var direction = Math.round(heading.trueHeading - currentLocation.DirectionTo(this.pointLocation)) % 360;
        var angleInRadians = -1 * ((direction + 90) % 360).toRad();
        var radius = (this.defaultWidth / 2) * this.scale;

        var x = radius + Math.round(radius * Math.cos(angleInRadians));
        var y = radius + Math.round(radius * Math.sin(angleInRadians));

        this.svg.setAttribute("width", (this.scale * this.defaultWidth).toString());
        this.svg.setAttribute("height", (this.scale * this.defaultWidth).toString());

        var line = this.svg.querySelector("line");
        line.setAttribute("x2", x.toString());
        line.setAttribute("y2", y.toString());
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
        pointer.setAttribute("x2", (size / 2).toString());
        pointer.setAttribute("y2", (size / 2).toString());
        pointer.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:1");
        svg.appendChild(pointer);

        return svg;
    },

    Resize: function (width) {
        this.rescale(width / this.defaultWidth);
    },

    Redraw: function () {
        this.PointTo(this.lastHeading, this.lastStartPoint);

        var size = this.scale * this.defaultWidth;
        var circle = this.svg.querySelector("circle");
        circle.setAttribute("cx", (size / 2).toString());
        circle.setAttribute("cy", (size / 2).toString());
        circle.setAttribute("r", (size / 3).toString());

        var pointer = this.svg.querySelector("line");
        pointer.setAttribute("x1", (size / 2).toString());
        pointer.setAttribute("y1", (size / 2).toString());
        pointer.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:" + this.scale.toString());
    },

    rescale: function (scale) {
        this.scale = scale;
        this.Redraw();
    }
}