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

/**
 * Source: https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */

function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = h * 360;
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    return {h : h,  s : s, l : l};
}

let inputType = process.argv[2].toLowerCase();

if (inputType === "hex") {
    let returnRGB;
    returnRGB = hexToRgb(process.argv[3]);
    returnHSL = rgbToHsl(returnRGB.r, returnRGB.g, returnRGB.b);
    console.log("R: " + returnRGB.r + " G: " + returnRGB.g + " B: " + returnRGB.b);
    console.log("H: " + returnHSL.h + " S: " + returnHSL.s + "% L: " + returnHSL.l + "%");
} else if (inputType === "rgb") {
    let returnValue;
    let inputR = parseInt(process.argv[3]);
    let inputG = parseInt(process.argv[4]);
    let inputB = parseInt(process.argv[5])
    returnValue = rgbToHex(inputR, inputG, inputB);
    returnHSL = rgbToHsl(inputR, inputG, inputB);
    console.log("HEX: " + returnValue);
    console.log("H: " + returnHSL.h + " S: " + returnHSL.s + "% L: " + returnHSL.l + "%");
} else {
    console.log("Error in input.");
}