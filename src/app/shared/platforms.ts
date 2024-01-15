/* ---
 * Source: https://github.com/ionic-team/ionic-framework/blob/b0d53ca73619585671d8cf4dc24e47f826495a0a/core/src/utils/platform.ts
 * --- */

const _cache = {
  mobile: null,
  capacitor: null,
};

export const matchMedia = (win: Window, query: string): boolean => win.matchMedia(query).matches;

export const testUserAgent = (win: Window, expr: RegExp) => {
  const userAgent: string = win.navigator.userAgent || win.navigator.vendor || (window as any).opera;
  return expr.test(userAgent);
};

export const isWindows = (win?: Window) => testUserAgent(win, /windows/i);

export const isTouchUi = (win?: Window) => matchMedia(win, '(any-pointer:coarse)');

const isIpad = (win: Window) => {
  // iOS 12 and below
  if (testUserAgent(win, /iPad/i)) {
    return true;
  }

  // iOS 13+
  if (testUserAgent(win, /Macintosh/i) && isTouchUi(win)) {
    return true;
  }

  return false;
};

export const isIOS = (win: Window) => testUserAgent(win, /iPhone|iPod/i) || isIpad(win);

export const isAndroid = (win: Window) => testUserAgent(win, /android|sink/i);

export function isCapacitor(win: Window): boolean {
  if (_cache.capacitor === null || _cache.capacitor === undefined) {
    _cache.capacitor = !!(win['Capacitor'] || win['capacitor']);
  }
  return _cache.capacitor;
}
export function isMobile(win: Window) {
  if (_cache.mobile === null || _cache.mobile === undefined) {
    _cache.mobile =
      isAndroid(win) ||
      isIOS(window) ||
      // Workaround, for MS Windows touch screen (detected as mobile, but forced as desktop)
      (isTouchUi(win) && !isWindows(win));
  }
  return _cache.mobile;
}
