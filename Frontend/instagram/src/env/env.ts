const server = 'http://localhost:8080/';
const apiVersion = 'api/v1/';
const webSocket = 'ws-chat';

export const environment = {
  server,
  apiVersion,
  apiHost: server + apiVersion,
  webSocketHost: server + webSocket
};
