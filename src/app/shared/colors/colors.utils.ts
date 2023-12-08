export type PredefinedColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark';

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function rgbArrayToHex(rgb: number[]): string {
  return '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);
}

export function hexToRgbArray(hex: string): number[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

// See mix in file ionic.functions.color.scss
export function mixHex(color1: string, color2: string, weight?: number) {
  weight = weight ? weight / 100 : 0.5;

  const rgb1 = hexToRgbArray(color1);
  if (!rgb1) throw Error('Invalid hex color:' + color1);

  const rgb2 = hexToRgbArray(color2);
  if (!rgb2) throw Error('Invalid hex color:' + color2);

  const rgbAverage = rgb1.map((v, index) => Math.round(v * weight + rgb2[index] * (1 - weight)));
  return rgbArrayToHex(rgbAverage);
}

// 12% darker version of the base color (mix with black)
export function getColorShade(color: string) {
  return mixHex('#000000', color, 12);
}

// 10% lighter version of the base color (mix with white)
export function getColorTint(color: string) {
  return mixHex('#ffffff', color, 10);
}

/**
 *
 * @param color
 * @param bw if true, will use black or white color, instead of the exact inverse
 */
export function getColorContrast(color: string, bw?: boolean) {
  const rgb = hexToRgbArray(color);
  if (!rgb) throw Error('Invalid hex color:' + color);

  if (bw === true) {
    // http://stackoverflow.com/a/3943023/112731
    return rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }

  return rgbArrayToHex(rgb.map((v) => 255 - v));
}
