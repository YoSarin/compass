var Pointer = function (currentLocation) {
    this.currentLocation = currentLocation;
    this.svg = this.initSVG();
}

Pointer.prototype = {
    PointTo: function (heading, directionFrom) {
        var direction = Math.round(heading.trueHeading - directionFrom.DirectionTo(this.currentLocation)) % 360;
        var angleInRadians = -1 * ((direction + 90) % 360).toRad();
        var radius = 10;

        var x = 10 + Math.round(radius * Math.cos(angleInRadians));
        var y = 10 + Math.round(radius * Math.sin(angleInRadians));

        var line = this.svg.querySelector("line");
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);
    },

    SVG: function () {
        return this.svg;
    },

    initSVG: function () {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        /*
        <svg width="20" height="20">
            <circle cx="10" cy="10" r="3" stroke="black" stroke-width="1" fill="white" />
            <line class="pointer" x1="10" y1="10" x2="10" y2="10" style="stroke:rgb(255,0,0);stroke-width:1" />
        </svg>
        */

        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("r", "3");
        circle.setAttribute("stroke", "black");
        circle.setAttribute("stroke-width", "1");
        circle.setAttribute("fill", "white");
        svg.appendChild(circle);

        var pointer = document.createElementNS("http://www.w3.org/2000/svg", "line");
        pointer.setAttribute("x1", "10");
        pointer.setAttribute("y1", "10");
        pointer.setAttribute("x2", "10");
        pointer.setAttribute("y2", "10");
        pointer.setAttribute("style", "stroke:rgb(255,0,0);stroke-width:1");
        svg.appendChild(pointer);

        return svg;
    }
}