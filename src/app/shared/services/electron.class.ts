// import { AppComponent } from "@app/app.component";

export interface ElectronApi {
  // on: (event: 'route') => void;
  // send: (event: 'ready') => void;
}

export interface ElectronWindow extends Window {
  electronAPI: ElectronApi;
}

export function isElectron(win: Window): win is ElectronWindow {
  return !!win['electronAPI'];
}
