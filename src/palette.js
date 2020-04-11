// This file contains a couple of palettes for quick restyling of the app.
import { LightenDarkenColor } from "lighten-darken-color";

const seaweed = {
  dark: "#095256",
  med: "#087f8c",
  light: "#5aaa95",
  dull: "#86a873",
  bright: "#bb9f06",

  text: "#111",
  smallFont: 12,
  medFont: 14,
  bigFont: 16
};

const palette = seaweed;
export const dark = palette.dark;
export const med = palette.med;
export const light = palette.light;
export const dull = palette.dull;
export const bright = palette.bright;
export const text = palette.text;
export const smallFont = palette.smallFont;
export const medFont = palette.medFont;
export const bigFont = palette.bigFont;
export const modify = LightenDarkenColor;
