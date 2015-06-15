"use strict";

module Depictr {

    export var canvas = <HTMLCanvasElement>document.getElementById("my-canvas");
    export var ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    ctx.textAlign = "center";
    ctx.fillText("Drop image here", canvas.width / 2, canvas.height / 2);
}