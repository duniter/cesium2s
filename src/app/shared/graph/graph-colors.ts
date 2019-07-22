import {PredefinedColors} from "@ionic/core";
import {isNil, isNotNil} from "../functions";

declare type ColorName = PredefinedColors |
  'white'
  | 'red'
  | 'green'
  | 'blue';


/**
 * Define here theme colors
 */
const rgbArrayMap = {
  'white': [255, 255, 255],
  'primary': [20, 67, 145], // ok
  'secondary': [117, 196, 253], // ok
  'tertiary': [91, 94, 244], // ok
  'danger': [245, 61, 61], // ok
  'light': [244, 245, 248], // ok
  'medium': [152, 154, 162], // ok
  'dark': [34, 36, 40], // ok
  'red': [255, 0, 0],
  'green': [0, 255, 0],
  'blue': [0, 0, 255]
};

// Fill a map of Color objects
const colorsMap: { [key: string]: Color } = {};


/**
 * Useful class for color conversion
 */
export class Color {

  // Helper method, to retrieve a color
  static get(name: ColorName): Color {
    return colorsMap[name] as Color;
  }

  static parseRgba(rgba: string): Color|null{
      if (!rgba || (!rgba.startsWith('rgb(') && !rgba.startsWith('rgba('))) return null;

      // Parse parts
      const parts = rgba
        .replace('rgb(', '')
        .replace('rgba(', '')
        .replace(')', '')
        .split(',');

      if (parts.length !== 3 && parts.length !== 4) return null;

      return new Color([+parts[0], +parts[1], +parts[2]],
        parts.length === 4 && +parts[3] || 1,
        'custom');
  }

  static transparent = function () {
    return new Color([0,0,0], 0, 'translucent');
  };

  constructor(
    private _rgbArray: number[],
    private _opacity?: number,
    private _name: string = 'custom'
  ) {
  }
  get name(): string {
    return this._name;
  }
  get opacity(): number{
    return isNotNil(this._opacity) ? this._opacity : 1;
  }
  get rgb(): number[] {
    return this._rgbArray;
  }

  get r(): number {
    return this._rgbArray[0];
  }

  get g(): number {
    return this._rgbArray[1];
  }

  get b(): number {
    return this._rgbArray[2];
  }

  rgba(opacity?: number): string {
    opacity = isNotNil(opacity) ? opacity : this._opacity;
    if (isNil(opacity) || opacity < 0 || opacity > 1) {
      return 'rgb(' + this._rgbArray.join(',') + ')';
    }
    return 'rgba(' + this._rgbArray.join(',') + ',' + opacity + ')';
  }

}

export declare interface ColorGradientOptions {
  opacity?: number;
  startColor?: number[];
  mainColor?: number[];
  mainColorIndex?: number;
  endColor?: number[];
  format?: 'rgb'|'hex'|'array';
}

export declare interface ColorScaleOptions extends ColorGradientOptions{
  min?: number;
  max?: number;
  upperMax?: boolean;
}

export declare interface ColorScaleLegendItem {
  label: string;
  color: string;
}

export declare interface ColorScaleLegend {
  items: ColorScaleLegendItem[];
}

/**
 * Helper class for colors scale
 */
export class ColorScale {

  static custom = (count: number, options?: ColorScaleOptions) => {
    options = options || {};
    return new ColorScale(
      linearColorGradientWithIntermediate(count, {
        opacity: options.opacity,
        startColor: options.startColor || undefined,
        mainColor: options.mainColor || undefined,
        mainColorIndex: isNotNil(options.mainColorIndex) ? options.mainColorIndex : undefined,
        endColor: options.endColor || undefined,
        format: options.format
      }) as string[],
      options
    );
  }

  static default() {
    return ColorScale.custom(25);
  }

  /**
   * Create a array with the given color
   **/
  static fix(length?: number, colorName?: ColorName): any[] {
    return Array.apply(null, Array(length || 25))
      .map(String.prototype.valueOf, Color.get(colorName || 'primary').rgba(0.5));
  }

  private _min: number;
  private _max: number;
  private _rangeSize: number;
  private _legendItems: ColorScaleLegendItem[];

  constructor(private colorArray: string[], options?: ColorScaleOptions) {
    options = options || {};
    // reserved last colors for value > max
    const nbIntervalBeforeUpper = !options.upperMax ? colorArray.length : (colorArray.length - 1);
    this._min = options.min || 0;
    this._max = options.max || nbIntervalBeforeUpper;
    this._rangeSize = Math.round((this._max - this._min) / nbIntervalBeforeUpper);
    this._legendItems = this.computeLegend();
  }

  get legend(): ColorScaleLegend {
    return {
      items: this._legendItems
    };
  }

  getValueColor(value: number): string {
    const index = Math.floor(value * (this.colorArray.length - 1) / this._max);
    return this.colorArray[index];
  }

  protected computeLegend(): ColorScaleLegendItem[] {
    return this.colorArray.map((color, index) => {
      const start = index * this._rangeSize;
      const end = start + this._rangeSize;
      return {
        color: color,
        label: (end < this._max) ? `${start.toLocaleString()} - ${end.toLocaleString()}` : ` >= ${start}`
      };
    });
  }
}


// Fill colorsMap
Object.getOwnPropertyNames(rgbArrayMap)
  .forEach((key) => {
    colorsMap[key] = new Color(rgbArrayMap[key], 1, key);
  });

// Internal function
function state2side(state) {
  switch (state) {
    case 0:
      return 0;
    case 1:
      return -1;
    case 2:
      return 0;
    case 3:
      return 1;
  }
}


const SCALE_OPTIONS_DEFAULT = {
  startColor: rgbArrayMap.red,
  startStates: [0, 2, 3], // R=keep, V=keep, B=increase
  startStepsFn: (defaultStateSize: number) => {
    return [
      Math.round((rgbArrayMap.red[0] - 50) / defaultStateSize),
      Math.round((255 - rgbArrayMap.red[1]) / defaultStateSize),
      Math.round((255 - rgbArrayMap.red[2]) / defaultStateSize)
    ];
  }
};

/**
 * Internal function, that create a colors scale, using iteration
 * @param count
 * @param opacity
 * @param startColor
 * @param startState
 * @returns {Array}
 */
function linearColorGradientWithIntermediate(count: number,
                                             options?: ColorGradientOptions): any[] {
  options = options || {};

  // From [0,1]
  options.opacity = (options.opacity > 0 && options.opacity < 1) ? options.opacity : 1;
  options.startColor = options.startColor || [255, 255, 190]; // default start = creme
  options.mainColorIndex = options.mainColorIndex && options.mainColorIndex < count - 1 ? options.mainColorIndex : count - 1;
  options.endColor = options.endColor || [255, 0, 0]; // default main = red
  options.format = options.format || 'rgb';

  if (!options.mainColor) {
    return linearColorGradient(count, {
      opacity: options.opacity,
      startColor: options.startColor,
      endColor: options.endColor,
      format: options.format
    });
  }

  else {
    // Step 1: startColor -> mainColor
    const result = linearColorGradient(options.mainColorIndex + 1, {
      opacity: options.opacity,
      startColor: options.startColor,
      endColor: options.mainColor,
      format: options.format
    });

    // Step 2: mainColor -> endColor
    if (options.mainColorIndex < count - 1) {
      return result.concat(
        linearColorGradient(count - options.mainColorIndex, {
          opacity: options.opacity,
          startColor: options.mainColor,
          endColor: options.endColor,
          format: options.format
        }));
    }
    else {
      return result;
    }
  }
}

function linearColorGradient(count: number,
                             options?: ColorGradientOptions): any[] {

  options = options || {};

  // From [0,1]
  options.opacity = (options.opacity > 0 && options.opacity < 1) ? options.opacity : 1;
  options.startColor = options.startColor || [255, 255, 255]; // default start = white
  options.endColor = options.endColor || [255, 0, 0]; // default end = red
  options.format = options.format || 'rgb';

  const result: number[][] = [];
  const color = options.startColor.slice(); // copy the start color
  const delta = [
    Math.round((options.endColor[0] - options.startColor[0]) / count),
    Math.round((options.endColor[1] - options.startColor[1]) / count),
    Math.round((options.endColor[2] - options.startColor[2]) / count)
  ];

  for (let i = 0; i < count - 1; i++) {
    for (let j = 0; j < 3; j++) {
      color[j] += delta[j];
    }
    result.push(color.slice());
  }

  // Force last color = end color
  result.push(options.endColor.slice());

  // Output as array
  if (options.format === 'array') {
    return result;
  }

  // Output as rgb(r,g,b) string
  if (options.format === 'rgb') {
    if (options.opacity >= 1) {
      return result.map(color => {
        return "rgb(" + color.join(',') + ")";
      });
    } else {
      return result.map(color => {
        return "rgba(" + color.concat(options.opacity).join(',') + ")";
      });
    }
  }

  // Output as hex
  // TODO
  // return result.map(color => {
  //   return "rgb(" + color.join(',') + ")";
  // });
  return result;
}
