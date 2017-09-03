var ErrorHandler = function (err) {
    this.err = err;
}

ErrorHandler.prototype.ReThrow = function () {
    throw this.err;
}

ErrorHandler.prototype.Save = function () {
    var errors = ErrorHandler.Load();
    errors.push({ message: this.err.toString(), stacktrace: this.err.stack });
    ErrorHandler.save(errors);
    return this;
}

ErrorHandler.shown = false;

ErrorHandler.Toggle = function () {
    if (ErrorHandler.shown) {
        ErrorHandler.Hide();
    } else {
        ErrorHandler.Show();
    }
}

ErrorHandler.Show = function () {
    ErrorHandler.shown = true;
    var element = document.getElementById("errorList");
    if (!element) {
        element = document.createElement("div");
        element.setAttribute("id", "errorList");
        document.body.appendChild(element);
    }

    element.innerHTML = "";

    var data = ErrorHandler.Load();

    data.forEach(function (err, idx) {
        var el = document.createElement("div");
        el.innerHTML = JSON.stringify(err);
        element.appendChild(el);
    });
}

ErrorHandler.Hide = function () {
    ErrorHandler.shown = false;
    var el = document.getElementById("errorList");
    if (el) {
        el.remove();
    }
}

ErrorHandler.Load = function () {
    var data = window.localStorage.getItem(ErrorHandler.Key());
    if (!data) {
        data = "[]";
    }
    return JSON.parse(data);
}

ErrorHandler.save = function (errors) {
    window.localStorage.setItem(ErrorHandler.Key(), JSON.stringify(errors));
}

ErrorHandler.Clear = function () {
    ErrorHandler.save([]);
}

ErrorHandler.Key = function () {
    return "storage:errors";
}