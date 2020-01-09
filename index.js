function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return ("#" + componentToHex(r) + componentToHex(g) + componentToHex(b));
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

let inputType = process.argv[2].toLowerCase();

if (inputType === "hex") {
    let returnValue;
    returnValue = hexToRgb(process.argv[3]);
    console.log("R: " + returnValue.r + " G: " + returnValue.g + " B: " + returnValue.b);
} else if (inputType === "rgb") {
    let returnValue;
    let inputR = parseInt(process.argv[3]);
    let inputG = parseInt(process.argv[4]);
    let inputB = parseInt(process.argv[5])
    returnValue = rgbToHex(inputR, inputG, inputB);
    console.log("HEX: " + returnValue);
}