Clickable = function (element) {
    this.element = element;
    return this;
};

Clickable.prototype = {
    handler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    OnClick: function (callback) {
        this.element.addEventListener(this.handler, callback);
    }
}