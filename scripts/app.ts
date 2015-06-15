module Depictr.Main {

    var loaders = document.getElementsByClassName("loading");

    var warnings = document.getElementsByClassName("warning");

    var warningTexts = document.getElementsByClassName("warning-message");

    export function openWarnings(message) {
        for (var i = 0; i < warnings.length; i++) {
            var warning = <HTMLElement>warnings[i];
            warning.className = warning.className.replace(/hidden/g, "");
        }

        for (var i = 0; i < warningTexts.length; i++) {
            var warningText = <HTMLElement>warningTexts[i];
            warningText.textContent = message;
        }
    }

    export function openLoaders() {
        for (var i = 0; i < loaders.length; i++) {
            var theItem = <HTMLElement>loaders[i];

            theItem.className = theItem.className.replace(/hidden/g, "");
        }
    }

    export function closeLoaders() {
        for (var i = 0; i < loaders.length; i++) {
            var theItem = <HTMLElement>loaders[i];

            theItem.className += " hidden";
        }
    }

    export function closeWarnings() {
        for (var i = 0; i < warnings.length; i++) {
            var warning = <HTMLElement>warnings[i];
            warning.className += " hidden";
        }
    }

    function updateData() {
        var data = ctx.getImageData(0, 0, canvas.width, canvas.height);

        var pixels = data.data;

        dance:
        for (var y = 0; y < data.height; y++) {
            for (var x = 0; x < data.width; x++) {
                var i = (y * data.width + x) << 2;

                var r = pixels[i];
                var g = pixels[i + 1];
                var b = pixels[i + 2];
                var a = pixels[i + 3];

                var myText = <HTMLDivElement>document.getElementById("my-script");

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

        ctx.putImageData(data, 0, 0);

        closeLoaders();
    }

    export function update() {

        openLoaders();

        setTimeout(updateData, 100);

        //window.requestAnimationFrame(updateData);
    }

}