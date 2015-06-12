module Depictr {

    var img = document.createElement("img");
    var clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
		
    // Image for loading	
    img.addEventListener("load", function () {
        clearCanvas();
        ctx.drawImage(img, 0, 0);
    }, false);
	
    // To enable drag and drop
    canvas.addEventListener("dragover", function (evt) {
        evt.preventDefault();
    }, false);

    // Handle dropped image file - only Firefox and Google Chrome
    canvas.addEventListener("drop", function (evt) {
        clearCanvas();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            var file = files[0];
            if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
                var reader = new FileReader();
                // Note: addEventListener doesn't work in Google Chrome for this event
                reader.onload = function (evt) {
                    img.src = evt.target["result"];
                };
                reader.readAsDataURL(file);
            }
        }
        evt.preventDefault();
    }, false);

}