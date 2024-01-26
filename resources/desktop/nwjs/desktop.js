// Rename "require" to avoid conflicts with pure JS libraries
requireNodejs = require;
require = undefined;

/**** NODEJS MODULES ****/

const fs = requireNodejs('fs'),
  path = requireNodejs('path'),
  yaml = requireNodejs('js-yaml'),
  bs58 = requireNodejs('bs58'),
  clc = requireNodejs('cli-color'),
  gui = requireNodejs('nw.gui');

Base58 = {
  encode: (bytes) => bs58.encode(new Buffer(bytes)),
  decode: (data) => new Uint8Array(bs58.decode(data))
};

/**** Program ****/
const APP_ID = "##APP_ID##";
const APP_NAME = "##APP_NAME##";
const HAS_SPLASH_SCREEN= true;
const SPLASH_SCREEN_TITLE = APP_NAME + " loading..."; // WARN: must be same inside splash.html

const HOME = requireNodejs('os').homedir();
const APP_HOME = path.resolve(HOME, path.join('.config', APP_ID));


const I18N = {
  "fr": {
    "MENU" : {
      "FILE": "Fichier",
      "QUIT_ITEM": "Quitter",
      "WINDOW": "Fenêtre",
      "NEW_WINDOW": "Nouvelle fenêtre",
      "OPEN_DEBUG_TOOL": "Outils de développement..."
    }
  },
  "en": {
    "MENU" : {
      "FILE": "File",
      "QUIT_ITEM": "Quit",
      "WINDOW": "Window",
      "NEW_WINDOW": "New window",
      "OPEN_DEBUG_TOOL": "Development tools..."
    }
  }
};

// Current window
const win = gui && gui.Window && gui.Window.get();

function isSdkMode () {
  return gui && typeof win.showDevTools === 'function';
}

function isMainWin(win) {
  return win && win.title === APP_NAME && true;
}

function isSplashScreen(win) {
  const title = win && win.title;
  console.debug('[desktop] Current window title: ' + title);
  return (title === SPLASH_SCREEN_TITLE);
}

/**
 * Read process command line args
 *
 * @returns {{debug: boolean, menu: boolean}}
 */
function getArgs() {
  const options = {
    verbose: false,
    menu: false,
    debug: false
  };
  const commands = gui && gui.App && gui.App.argv;
  if (commands && commands.length) {
    for (let i in commands) {
      switch (commands[i]) {
        case "--verbose":
          options.verbose = true;
          break;
        case "--menu":
          options.menu = true;
          break;
        case "--debug":
          options.debug = true && isSdkMode();
          break;
      }
    }
  }

  options.home = HOME;
  return options;
}

/**
 * Re-routing console log
 */
function consoleToStdout(options) {
  const superConsole = {
    log: console.log,
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }
  const printArguments = function(arguments) {
    if (arguments.length > 0) {

      for (let i = 0; i < arguments.length; i++) {

        if (i === 1) process.stdout.write('\t');

        const argument = arguments[i];
        if (typeof argument === "object" && argument.stack) {
          process.stdout.write(argument.stack);
        }
        else if (typeof argument === "string") {
          process.stdout.write(argument);
        }
        else {
          process.stdout.write(JSON.stringify(argument));
        }
      }
    }
    process.stdout.write('\n');
  };

  if (options && options.debug) {
    console.debug = function (message) {
      process.stdout.write(clc.green("[DEBUG] "));
      printArguments(arguments);
      superConsole.debug.apply(this, arguments);
    };
    console.log = function(message) {
      process.stdout.write(clc.green("[CONSOLE] "));
      printArguments(arguments);
      superConsole.log.apply(this, arguments);
    }
  }

  console.info = function(message) {
    process.stdout.write(clc.blue("[INFO]  "));
    printArguments(arguments);
    superConsole.info.apply(this, arguments);
  };

  console.warn = function(message) {
    process.stdout.write(clc.yellow("[WARN]  "));
    printArguments(arguments);
    superConsole.warn.apply(this, arguments);
  };

  console.error = function() {
    process.stderr.write(clc.red("[ERROR] "));
    printArguments(arguments);
    superConsole.error.apply(this, arguments);
  };
}


function initLogger(options) {
  options = options || getArgs();

  if (options.verbose) {
    if (options.debug) {
      // SDK enable: not need to redirect debug
    }
    else {
      // Re-routing console log
      consoleToStdout(options);
    }
  }
  else {
    // Re-routing console log
    consoleToStdout(options);
  }
}

function openDebugger(subWin, callback) {
  subWin = subWin || win;
  if (isSdkMode()) {
    try {
      console.info("[desktop] Opening debugger...");
      subWin.showDevTools();
      if (callback) callback();
    }
    catch(err) {
      console.error("[desktop] Cannot open debugger:", err);
    }
  }
  else {
    if (callback) callback();
  }
}

function loadSettings(options) {
  if (options && options.settings) return; // Skip, already filled

  console.debug("[desktop] Getting settings from the local storage...");

  let settingsStr = window.localStorage.getItem('settings');
  options.settings = (settingsStr && JSON.parse(settingsStr));
  const localeId = options.settings && options.settings.locale && options.settings.locale.id;
  options.locale = localeId && localeId.split('-')[0] || options.locale || 'en';
}

/**
 * Add menu bar to a window
 * @param win
 * @param options
 */
function addMenu(subWin, options) {
  if (!subWin) {
    console.error("Required 'subWin' argument");
    return;
  }
  options = options || getArgs();
  if (!options.locale) {
    loadSettings(options);
  }
  const locale = options.locale || 'en';

  console.debug("[desktop] Adding menu...");

  var menuBar = new gui.Menu({ type: 'menubar' });

  // File
  var filemenu = new gui.Menu();
  let quitItem = new gui.MenuItem({
    label: I18N[locale].MENU.QUIT_ITEM,
    click: function() {
      console.info("[desktop] Closing...");
      gui.App.closeAllWindows();
    },});
  filemenu.append(quitItem);
  menuBar.append(new gui.MenuItem({
    label: I18N[locale].MENU.FILE,
    submenu: filemenu
  }));

  // Window
  {
    const winmenu = new gui.Menu();

    // Window > New window
    let newWinItem = new gui.MenuItem({
      label: I18N[locale].MENU.NEW_WINDOW,
      click: () => openSecondaryWindow(options)
    });
    winmenu.append(newWinItem);


    // Window > Debugger
    if (options.sdk) {
      let debugWinItem = new gui.MenuItem({
        label: I18N[locale].MENU.OPEN_DEBUG_TOOL,
        click: () => openDebugger()
      });
      winmenu.append(debugWinItem);
    }

    menuBar.append(new gui.MenuItem({
      label: I18N[locale].MENU.WINDOW,
      submenu: winmenu
    }));
  }


  // Applying menu
  subWin.menu = menuBar;
}


function openNewWindow(options, callback) {
  options = {
    title: APP_NAME,
    position: 'center',
    width: 1300,
    height: 800,
    min_width: 750,
    min_height: 400,
    frame: true,
    focus: true,
    ...options
  };
  console.debug("[desktop] Opening window {id: '"+ options.id + "', title: '"+ options.title +"'} ...");
  gui.Window.open('www/index.html', {
    id: options.id,
    title: options.title,
    position: options.position,
    width:  options.width,
    height:  options.height,
    min_width:  options.min_width,
    min_height:  options.min_height,
    frame:  options.frame,
    focus:  options.focus,
    fullscreen: false
  }, callback);
}

function openMainWindow(options, callback) {
  console.info("[desktop] Starting main window...");

  openNewWindow({
    id: APP_ID,
    ...options
  }, callback);
}

function openSecondaryWindow(options, callback) {
  openNewWindow({
    id: APP_ID + "-secondary",
    ...options
  }, callback);
}


/****
 * Main PROCESS
 */
function startApp(options) {
  options = options || getArgs();

  if (options.debug) {
    openDebugger(win);
  }

  try {
    console.info("[desktop] Launching "+ APP_NAME + "...", options);

    loadSettings(options);

    console.info("[desktop] User home:  ", options.home);
    console.info("[desktop] User locale:", options.locale);
    console.info("[desktop] Has splash screen? " + HAS_SPLASH_SCREEN);

    // If app was started using the splash screen, launch the main window
    if (HAS_SPLASH_SCREEN === true) {

      openMainWindow(options);

      // Close the splash screen, after 1s
      setTimeout(() => win.close(), 1000);
    }
  }
  catch (err) {
    console.error("[desktop] Error while trying to launch: " + (err && err.message || err || ''), err);

    if (options.debug) {
      // Keep open, if debugger open
    }
    else {
      // If app was started using the splash screen, close it
      if (HAS_SPLASH_SCREEN) {
        // Close the splash screen
        setTimeout(() => win.close());
      }
    }
  }
}

// -- MAIN --

// Get command args
const options = getArgs();
// Init logger
initLogger(options);

// Splash screen: start the app
if (isSplashScreen(win)) {
  console.debug('[desktop] isSplashScreen');
  setTimeout(() => startApp(options), 1000);
}
// Main window
else if (isMainWin(win)) {
  console.debug('[desktop] isMainWin');
  // If App not already start : do it
  if (HAS_SPLASH_SCREEN === false) {
    startApp(options);
  }

  // Else (if started) just open the debugger
  else if (options.debug) {
    openDebugger(win);
  }
}
else {
  console.warn("[desktop] Unknown window title: " + (win && win.title || 'undefined'));
}

