import { handleNewMessage } from "./chat";
import { handleDisconnected, handleNewUser } from "./notifications";

let socket = null;

export const updateSockets = (aSocket) => {
  socket = aSocket;
};

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
  const { events } = window;
  updateSockets(aSocket);
  aSocket.on(events.newUser, handleNewUser);
  aSocket.on(events.disconnected, handleDisconnected);
  aSocket.on(events.newMsg, handleNewMessage);
};
