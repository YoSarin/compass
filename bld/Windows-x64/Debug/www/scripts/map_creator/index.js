﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";
    document.getElementById("import").hidden = true;

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        var svg = document.getElementById("svgDrawing");


        Storage.Load();

        if (Storage.locations.length > 0) {
            drawSVG(Storage.locations, svg);
        } else {
            document.getElementById("import").hidden = false;
            document.getElementById("submit").addEventListener("click", function () {
                var stringData = document.getElementById("data").textContent.trim();
                var data = JSON.parse(stringData);
                if (data) {
                    document.getElementById("import").hidden = true;
                    drawSVG(data, svg);
                }
            });
        };

        new Clickable(document.getElementById("export")).OnClick(function () {
            var text = svg.outerHTML;
            window.plugins.socialsharing.share(text, null, null, null);
        });
        new Clickable(document.getElementById("return")).OnClick(function () { window.open("index.html", "_self"); });
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();

function drawSVG(data, svg) {
    svg.setAttribute("width", "100%");
    var bbox = svg.getBoundingClientRect();

    var recalc = findBounds(data);

    var padding = 20;
    var width = bbox.width - 2*padding;
    var height = width/recalc.aspectRatio();
    svg.setAttribute("height", (height + 2 * padding).toString() + "px");

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("fill", "orange");
    circle.setAttribute("stroke", "red");
    circle.setAttribute("stroke-width", "1");
    circle.setAttribute("r", "2");

    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    data.forEach(function (item, index) {
        var x = recalc.x(item.position.coords.longitude, width) + padding;
        var y = recalc.y(item.position.coords.latitude, height) + padding;

        var c = circle.cloneNode();
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        svg.appendChild(c);

        var t = text.cloneNode();
        t.setAttribute("y", y - 2);
        t.setAttribute("font-size", 8);
        t.textContent = item.text;
        svg.appendChild(t);
        var bbox = t.getBBox();
        t.setAttribute("x", x - (bbox.width/2));
    });

}

function findBounds(data) {
    var response = {
        minLat: 90,
        maxLat: 0,
        minLon: 90,
        maxLon: 0,
        _lat0: null,
        r: Point.EarthRadius,

        y: function (lat, height) {
            return height - ((this._y(lat) - this._y(this.minLat)) / this.height()) * height;
        },

        _y: function(lat) {
            return -1*this.r * lat.toRad();
        },

        x: function (lon, width) {
            return ((this._x(lon) - this._x(this.minLon)) / this.width()) * width;
        },

        _x: function (lon) {
            // *-1 protože jsme špatným směrem
            return -1*this.r * lon.toRad() * Math.cos(this.lat0());
        },

        aspectRatio: function () {
            return this.width()/this.height();
        },

        lat0: function () {
            if (!this._lat0) {
                this._lat0 = this.maxLat/2 + this.minLat/2;
            }
            return this._lat0;
        },

        width: function() {
            return this._x(this.maxLon) - this._x(this.minLon);
        },

        height: function() {
            return this._y(this.maxLat) - this._y(this.minLat);
        }
    }

    data.forEach(function (item, index) {
        response.minLat = Math.min(response.minLat, item.position.coords.latitude);
        response.maxLat = Math.max(response.maxLat, item.position.coords.latitude);
        response.minLon = Math.min(response.minLon, item.position.coords.longitude);
        response.maxLon = Math.max(response.maxLon, item.position.coords.longitude);
    });

    return response;
}