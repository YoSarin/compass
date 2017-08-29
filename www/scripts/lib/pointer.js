var Pointer = function (currentLocation, scale = 1) {
    this.currentLocation = currentLocation;
    this.svg = this.initSVG();
    this.scale = scale;
    this.lastHeading = null;
    this.lastStartPoint = null;
    this.defaultWidth = 20;
}

Pointer.prototype = {
    PointTo: function (heading, directionFrom) {
        this.lastHeading = heading;
        this.lastStartPoint = directionFrom;

        var direction = Math.round(heading.trueHeading - directionFrom.DirectionTo(this.currentLocation)) % 360;
        var angleInRadians = -1 * ((direction + 90) % 360).toRad();
        var radius = (this.defaultWidth / 2) * this.scale;

        var x = radius + Math.round(radius * Math.cos(angleInRadians));
        var y = radius + Math.round(radius * Math.sin(angleInRadians));

        this.svg.setAttribute("width", this.scale * this.defaultWidth);
        this.svg.setAttribute("height", this.scale * this.defaultWidth);

        var line = this.svg.querySelector("line");
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
    },

    SVG: function () {
        return this.svg;
    },

    initSVG: function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        var size = this.scale * this.defaultWidth;

        svg.setAttribute("width", size);
        svg.setAttribute("height", size);

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", size/2);
        circle.setAttribute("cy", size/2);
        circle.setAttribute("r", size/3);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("fill", "white");
        svg.appendChild(circle);

        var pointer = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pointer.setAttribute("x1", size / 2);
        pointer.setAttribute("y1", size / 2);
        pointer.setAttribute("x2", size / 2);
        pointer.setAttribute("y2", size / 2);
        pointer.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:1");
        svg.appendChild(pointer);

        return svg;
    },

    Resize: function (width) {
        this.rescale(width / this.defaultWidth);
    },

    Redraw: function () {
        this.PointTo(this.lastHeading, this.lastStartPoint);
    },

    rescale: function (scale) {
        this.scale = scale;
        this.Redraw;
    }
}