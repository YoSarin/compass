Clickable = function (element) {
    this.element = element;
    this.clickCount = 0;
    this.multiclickTimer = null;
    return this;
};

Clickable.prototype = {
    handler: ('ontouchstart' in document.documentElement ? "touchstart" : "click"),
    OnClick: function (callback) {
        this.element.addEventListener(this.handler, callback);
    },
    OnMultiClick: function (callback, count) {
        this.element.addEventListener(this.handler, function () {
            this.multiclickTimerSetup();
            this.clickCount++;
            if (this.clickCount == count) {
                callback();
            }
        }.bind(this));
    },
    multiclickTimerSetup: function () {
        if (this.multiclickTimer) {
            window.clearTimeout(this.multiclickTimer);
        }
        this.multiclickTimer = window.setTimeout(this.clearMulticlick.bind(this), 300);
    },

    clearMulticlick: function () {
        this.clickCount = 0;
    },
}