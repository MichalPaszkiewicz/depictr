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
