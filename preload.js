const { ipcRenderer } = require('electron');
const { contextBridge, ipcRender } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
  // on: (event) => ipcRenderer.invoke('on', event),
  // send: (event, message) => ipcRenderer.invoke('send', event, message),
});
