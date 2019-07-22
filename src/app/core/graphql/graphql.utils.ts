import {defaultDataIdFromObject} from "apollo-cache-inmemory";

declare let window: any;
const _global = typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : {});
export const NativeWebSocket = _global.WebSocket || _global.MozWebSocket;

/**
 * AppWebSocket class.
 * With a hack on default Websocket, to avoid the use of protocol
 */
export const AppWebSocket = function (url: string, protocols?: string | string[]) {
  return new NativeWebSocket(url/*no protocols*/);
} as any;
AppWebSocket.CLOSED = NativeWebSocket.CLOSED;
AppWebSocket.CLOSING = NativeWebSocket.CLOSING;
AppWebSocket.CONNECTING = NativeWebSocket.CONNECTING;
AppWebSocket.OPEN = NativeWebSocket.OPEN;


/**
 * Custom ID generation, for the GraphQL cache
 * @param object
 */
export const dataIdFromObject = function (object: Object): string {
  switch (object['__typename']) {

    // Define specific entity ID
      //case 'SpecificEntity':
      // return object['entityName'] + ':' + object['id'];

    // Fallback to default cache key
    default:
      return defaultDataIdFromObject(object);
  }
};

