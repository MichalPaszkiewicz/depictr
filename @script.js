"use strict";
var Depictr;
(function (Depictr) {
    Depictr.canvas = document.getElementById("my-canvas");
    Depictr.ctx = Depictr.canvas.getContext("2d");
    Depictr.canvas.width = 500;
    Depictr.canvas.height = 500;
    Depictr.ctx.textAlign = "center";
    Depictr.ctx.fillText("Drop image here", Depictr.canvas.width / 2, Depictr.canvas.height / 2);
})(Depictr || (Depictr = {}));
function fixVal(value) {
    return Math.max(0, Math.min(255, Math.round(value)));
}
function roundToNearest(value, roundTo) {
    return Math.min(255, Math.round(value / roundTo) * roundTo);
}
function weight(value, newValue, percentage) {
    var z = value - (value - newValue) * percentage / 100;
    return Math.max(0, Math.min(255, Math.round(z)));
}
var Depictr;
(function (Depictr) {
    Depictr.img = document.createElement("img");
    var clearCanvas = function () {
        Depictr.ctx.clearRect(0, 0, Depictr.canvas.width, Depictr.canvas.height);
    };
    // Image for loading	
    Depictr.img.addEventListener("load", function () {
        clearCanvas();
        Depictr.ctx.drawImage(Depictr.img, 0, 0);
    }, false);
    // To enable drag and drop
    Depictr.canvas.addEventListener("dragover", function (evt) {
        evt.preventDefault();
    }, false);
    // Handle dropped image file - only Firefox and Google Chrome
    Depictr.canvas.addEventListener("drop", function (evt) {
        clearCanvas();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0];
            if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
                var reader = new FileReader();
                // Note: addEventListener doesn't work in Google Chrome for this event
                reader.onload = function (evt) {
                    Depictr.img.src = evt.target["result"];
                };
                reader.readAsDataURL(file);
            }
        }
        evt.preventDefault();
    }, false);
})(Depictr || (Depictr = {}));
var Depictr;
(function (Depictr) {
    var Main;
    (function (Main) {
        var loaders = document.getElementsByClassName("loading");
        var warnings = document.getElementsByClassName("warning");
        var warningTexts = document.getElementsByClassName("warning-message");
        function openWarnings(message) {
            for (var i = 0; i < warnings.length; i++) {
                var warning = warnings[i];
                warning.className = warning.className.replace(/hidden/g, "");
            }
            for (var i = 0; i < warningTexts.length; i++) {
                var warningText = warningTexts[i];
                warningText.textContent = message;
            }
        }
        Main.openWarnings = openWarnings;
        function openLoaders() {
            for (var i = 0; i < loaders.length; i++) {
                var theItem = loaders[i];
                theItem.className = theItem.className.replace(/hidden/g, "");
            }
        }
        Main.openLoaders = openLoaders;
        function closeLoaders() {
            for (var i = 0; i < loaders.length; i++) {
                var theItem = loaders[i];
                theItem.className += " hidden";
            }
        }
        Main.closeLoaders = closeLoaders;
        function closeWarnings() {
            for (var i = 0; i < warnings.length; i++) {
                var warning = warnings[i];
                warning.className += " hidden";
            }
        }
        Main.closeWarnings = closeWarnings;
        function updateData() {
            var data = Depictr.ctx.getImageData(0, 0, Depictr.canvas.width, Depictr.canvas.height);
            var pixels = data.data;
            dance: for (var y = 0; y < data.height; y++) {
                for (var x = 0; x < data.width; x++) {
                    var i = (y * data.width + x) << 2;
                    var r = pixels[i];
                    var g = pixels[i + 1];
                    var b = pixels[i + 2];
                    var a = pixels[i + 3];
                    var myText = document.getElementById("my-script");
                    var myScript = myText.textContent;
                    try {
                        eval(myScript);
                    }
                    catch (e) {
                        closeLoaders();
                        openWarnings(e);
                        break dance;
                    }
                    r = fixVal(r);
                    g = fixVal(g);
                    b = fixVal(b);
                    a = fixVal(a);
                    data.data[i] = r;
                    data.data[i + 1] = g;
                    data.data[i + 2] = b;
                    data.data[i + 3] = a;
                }
            }
            Depictr.ctx.putImageData(data, 0, 0);
            closeLoaders();
        }
        function update() {
            openLoaders();
            setTimeout(updateData, 100);
            //window.requestAnimationFrame(updateData);
        }
        Main.update = update;
    })(Main = Depictr.Main || (Depictr.Main = {}));
})(Depictr || (Depictr = {}));
/// <reference path="scripts/initialise.ts" />
/// <reference path="scripts/functions.ts" />
/// <reference path="scripts/dropper.ts" />
/// <reference path="scripts/app.ts" />
//# sourceMappingURL=@script.js.map